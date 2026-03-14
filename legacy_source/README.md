# After School React + Firebase

## 1) Install
```bash
npm install
```

## 2) Environment
- `.env.example`를 복사하여 `.env` 생성
- Firebase Console의 웹 앱 설정 값 입력
- 로컬 에뮬레이터 사용 시: `VITE_USE_FIREBASE_EMULATOR=true`

## 3) Preflight check
```bash
npm run preflight
```

## 4) Local run
```bash
npm run dev
```

## 5) Emulator run (Auth + Firestore + Hosting)
```bash
npm run emulators
```
- Emulator UI: http://127.0.0.1:4000
- Auth: 127.0.0.1:9099
- Firestore: 127.0.0.1:8080
- Hosting: 127.0.0.1:5000

## 6) Seed emulator data
```bash
npm run emulators:seed
```
또는 에뮬레이터 실행 중 별도 터미널에서:
```bash
npm run seed:emulator
```

기본 계정:
- admin@afterschool.local / Password123!
- teacher@afterschool.local / Password123!
- staff@afterschool.local / Password123!

## 7) Firestore Rules / Indexes deploy
```bash
npx firebase-tools deploy --project <PROJECT_ID> --only firestore:rules,firestore:indexes
```

## 8) Deployment (local script)
PowerShell:
```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/deploy.ps1 -ProjectId <PROJECT_ID>
```

## 9) Deployment (GitHub Actions)
- Workflow: `.github/workflows/firebase-deploy.yml`
- Repo secret 필요: `FIREBASE_TOKEN`
- 실행 시 `project_id` 입력

## 10) Deployment (manual)
```bash
npm run build
npx firebase-tools deploy --project <PROJECT_ID> --only hosting
```

## Troubleshooting
- `Error: Could not spawn java -version`
  - JDK 17+ 설치 후 `java -version` 확인
  - Java bin 경로를 PATH에 추가
- Firebase 권한 오류
  - `firebase login` 재실행
  - 필요 시 `firebase logout` 후 다시 로그인
- Emulator 연결 확인
  - `.env`에서 `VITE_USE_FIREBASE_EMULATOR=true`
  - 프런트 재시작 (`npm run dev`)