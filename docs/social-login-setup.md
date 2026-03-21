# Social Login Setup

This project already supports these client-side login flows on `/login`.

- Google via Firebase `GoogleAuthProvider`
- Kakao via Firebase OIDC provider
- Naver via Firebase OIDC provider

## 1. Firebase prerequisites

Open Firebase Console for project `afterschool-74294`.

- Go to `Authentication`
- Add `localhost` to Authorized domains
- Enable `Google` in Sign-in method

For Kakao and Naver, plain Firebase Auth is not enough. You need:

- `Firebase Authentication with Identity Platform`
- OIDC providers configured in Firebase Authentication

## 2. Google setup

In Firebase Authentication > Sign-in method:

- Enable `Google`
- Set a support email

That is enough for the current code.

## 3. Kakao setup

Create an app in Kakao Developers and enable Kakao Login.

Required Kakao-side items:

- Enable OpenID Connect
- Add your site URL for local development
- Use Firebase auth handler URL as redirect/callback URL

Typical local callback URL:

```text
https://afterschool-74294.firebaseapp.com/__/auth/handler
```

Then create an OIDC provider in Firebase Authentication.

Recommended values:

- Provider ID: `oidc.kakao`
- Client ID: your Kakao REST API key / OIDC client id
- Client secret: Kakao client secret if enabled
- Issuer: Kakao OIDC issuer from Kakao Developers docs

After that, set this in `.env.local` if you use a different provider id:

```env
NEXT_PUBLIC_FIREBASE_KAKAO_PROVIDER_ID=oidc.kakao
```

## 4. Naver setup

Create an app in Naver Developers and enable Naver Login.

Required Naver-side items:

- Enable OpenID Connect if your app configuration supports it
- Add your local service URL
- Add Firebase auth handler URL as callback URL

Typical local callback URL:

```text
https://afterschool-74294.firebaseapp.com/__/auth/handler
```

Then create an OIDC provider in Firebase Authentication.

Recommended values:

- Provider ID: `oidc.naver`
- Client ID: your Naver client id
- Client secret: your Naver client secret
- Issuer: Naver OIDC issuer from Naver Developers docs

Then set this in `.env.local` if needed:

```env
NEXT_PUBLIC_FIREBASE_NAVER_PROVIDER_ID=oidc.naver
```

## 5. Automated Firebase configuration

If you already have provider credentials, this project can push the Firebase Auth settings directly:

```bash
npm run auth:configure-social
```

Required environment variables:

```env
GOOGLE_OAUTH_CLIENT_ID=
NEXT_PUBLIC_FIREBASE_KAKAO_PROVIDER_ID=oidc.kakao
KAKAO_OIDC_CLIENT_ID=
KAKAO_OIDC_CLIENT_SECRET=
KAKAO_OIDC_ISSUER=
NEXT_PUBLIC_FIREBASE_NAVER_PROVIDER_ID=oidc.naver
NAVER_OIDC_CLIENT_ID=
NAVER_OIDC_CLIENT_SECRET=
NAVER_OIDC_ISSUER=
```

The script updates Firebase Authentication by Admin API using the existing service account from `.env.local`.

## 6. Current app behavior

Relevant files:

- `src/app/login/LoginPageClient.tsx`
- `src/lib/social-auth.ts`

Implemented behavior:

- Email login
- Google popup login
- Kakao popup login through Firebase OIDC
- Naver popup login through Firebase OIDC
- Remember-me persistence
- Auto-create/update Firestore `users/{uid}` on social login

## 7. Troubleshooting

`auth/operation-not-allowed`

- Provider is not enabled in Firebase Authentication
- OIDC provider is missing
- Identity Platform is not enabled for the Firebase project

`auth/unauthorized-domain`

- Add `localhost` to Firebase Authorized domains

`auth/invalid-provider-id`

- Firebase OIDC provider id does not match `.env.local`

Popup opens but login fails after provider redirect

- Callback URL in Kakao/Naver console does not match Firebase auth handler
- Client ID / secret / issuer is wrong

## 8. Verification checklist

- `http://localhost:3000/login` shows Google, Kakao, Naver buttons
- Google login opens Firebase popup and completes
- Kakao login completes and returns to the app
- Naver login completes and returns to the app
- Firestore gets a `users/{uid}` document after social login
