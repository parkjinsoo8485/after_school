import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { GoogleAuth } from 'google-auth-library';

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  const content = fs.readFileSync(filePath, 'utf8');

  for (const line of content.split(/\r?\n/)) {
    if (!line || line.trim().startsWith('#')) continue;
    const idx = line.indexOf('=');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[key] = value.replace(/\\n/g, '\n');
  }

  return env;
}

function getEnv(name, localEnv) {
  return process.env[name] || localEnv[name] || '';
}

async function authorizedClient(localEnv) {
  const projectId = getEnv('FIREBASE_ADMIN_PROJECT_ID', localEnv);
  const clientEmail = getEnv('FIREBASE_ADMIN_CLIENT_EMAIL', localEnv);
  const privateKey = getEnv('FIREBASE_ADMIN_PRIVATE_KEY', localEnv);

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase admin credentials. Check .env.local.');
  }

  const auth = new GoogleAuth({
    credentials: {
      client_email: clientEmail,
      private_key: privateKey,
    },
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  return { projectId, client: await auth.getClient() };
}

async function patchGoogleProvider(client, projectId, localEnv) {
  const clientId = getEnv('GOOGLE_OAUTH_CLIENT_ID', localEnv);
  const clientSecret = getEnv('GOOGLE_OAUTH_CLIENT_SECRET', localEnv);

  if (!clientId || !clientSecret) {
    console.log('Skipping Google provider: GOOGLE_OAUTH_CLIENT_ID or GOOGLE_OAUTH_CLIENT_SECRET is missing.');
    return;
  }

  const body = {
    enabled: true,
    clientId,
    clientSecret,
  };

  try {
    const createRes = await client.request({
      url: `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/defaultSupportedIdpConfigs?idpId=google.com`,
      method: 'POST',
      data: body,
    });
    console.log(`Google provider created: ${createRes.data.name}`);
  } catch (error) {
    if (error?.response?.status !== 409) {
      throw error;
    }

    const patchRes = await client.request({
      url: `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/defaultSupportedIdpConfigs/google.com?updateMask=enabled,clientId,clientSecret`,
      method: 'PATCH',
      data: body,
    });
    console.log(`Google provider updated: ${patchRes.data.name}`);
  }
}

async function upsertOidcProvider(client, projectId, localEnv, options) {
  const providerId = getEnv(options.providerIdEnv, localEnv);
  const clientId = getEnv(options.clientIdEnv, localEnv);
  const clientSecret = getEnv(options.clientSecretEnv, localEnv);
  const issuer = getEnv(options.issuerEnv, localEnv);

  if (!providerId || !clientId || !clientSecret || !issuer) {
    console.log(`Skipping ${options.label}: missing ${options.providerIdEnv}/${options.clientIdEnv}/${options.clientSecretEnv}/${options.issuerEnv}.`);
    return;
  }

  const encodedProviderId = encodeURIComponent(providerId);
  const name = `projects/${projectId}/oauthIdpConfigs/${providerId}`;
  const url = `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/oauthIdpConfigs?oauthIdpConfigId=${encodedProviderId}`;
  const body = {
    name,
    displayName: options.label,
    enabled: true,
    issuer,
    clientId,
    clientSecret,
    responseType: {
      idToken: true,
      code: true,
    },
  };

  try {
    const createRes = await client.request({
      url,
      method: 'POST',
      data: body,
    });
    console.log(`${options.label} OIDC provider created: ${createRes.data.name}`);
  } catch (error) {
    if (error?.response?.status !== 409) {
      throw error;
    }

    const patchUrl = `https://identitytoolkit.googleapis.com/admin/v2/projects/${projectId}/oauthIdpConfigs/${encodedProviderId}?updateMask=enabled,displayName,issuer,clientId,clientSecret,responseType`;
    const patchRes = await client.request({
      url: patchUrl,
      method: 'PATCH',
      data: body,
    });
    console.log(`${options.label} OIDC provider updated: ${patchRes.data.name}`);
  }
}

async function main() {
  const localEnv = loadEnvFile(path.join(process.cwd(), '.env.local'));
  const { projectId, client } = await authorizedClient(localEnv);

  await patchGoogleProvider(client, projectId, localEnv);
  await upsertOidcProvider(client, projectId, localEnv, {
    label: 'Kakao',
    providerIdEnv: 'NEXT_PUBLIC_FIREBASE_KAKAO_PROVIDER_ID',
    clientIdEnv: 'KAKAO_OIDC_CLIENT_ID',
    clientSecretEnv: 'KAKAO_OIDC_CLIENT_SECRET',
    issuerEnv: 'KAKAO_OIDC_ISSUER',
  });
  await upsertOidcProvider(client, projectId, localEnv, {
    label: 'Naver',
    providerIdEnv: 'NEXT_PUBLIC_FIREBASE_NAVER_PROVIDER_ID',
    clientIdEnv: 'NAVER_OIDC_CLIENT_ID',
    clientSecretEnv: 'NAVER_OIDC_CLIENT_SECRET',
    issuerEnv: 'NAVER_OIDC_ISSUER',
  });
}

main().catch((error) => {
  console.error(error.response?.data || error);
  process.exit(1);
});
