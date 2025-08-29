파일을 받으신 후

```bash
npm install
npm run dev
# or
yarn install
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
```

또는

```bash
npm install
npm run build
npm run start
```

## 기술 선택

# 패키지

Tailwind: CSS 클래스 쉽게 적용할 수 있도록 선택했습니다
React Datepicker: 생년월일을 직접 선택할 수 있도록 추가했습니다.

# 로그인

로그인 정보는 로컬스토리지 또는 쿠키에서 저장할 수 있으며, https만 접속되도록 쿠키로 개발했습니다.
또한 서버 사이드로만 접근이 가능해서 정보가 보다 더 안전하게 저장할 수 있습니다

회원가입에 대한 정보는 로컬스토리지로 했으며 일종의 데이터베이스로 활용했습니다. 물론 실제 상황에서는 비밀번호는 해시하여 실 DB에서 저장될 것입니다. 이번 데모에서 백엔드 및 데이터베이스를 활용하지 않아 로컬 스토리지를 활용하기로 했습니다.

## 발생한 이슈

매인 화면을 보호하기 위해서 (private) 폴더를 분리하여, 로그인정보가 없으면 /login 페이지를 강제 이동시키게 설정했을 때 Too_many_redirects 문제가 발생했습니다. 이때 middleware.ts 잘못 설정했다는 것을 보고 matchers를 추가했습니다.

그리고 DB 없이 로컬 스토리지만 활용하기 때문에 모델을 보낼 때 string으로 보내야 하는 문제를 발견했습니다. 이때 JSON.stringify 또는 JSON.parse를 활용했습니다.
