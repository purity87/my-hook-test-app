This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

------------------------------------------------------------------------------------------------------------

 1. useState로 간단한 카운터 형태의 커스텀 훅(useCounter)을 직접 구현
  -> React + Next.js + Jest 조합으로 테스트 프로젝트 구성
  -> Hook 테스트 중 발생한 에러 분석 및 대응:
  -> 1) ReferenceError: React is not defined -> 파일 상단에 import React from 'react' 명시
  -> 2) Error: Attempted to call useCounter() from the server -> 'use client' 지시어 누락 (Next.js 13 이상 환경에서 클라이언트 컴포넌트임을 명시하지 않아 서버에서 훅 호출 오류 발생)
  -> 3) next/font 관련 Babel 충돌 -> .babelrc에 next/babel preset 명시 (Next.js와 Babel 설정 충돌 )
  -> 4) node_modules/.bin/jest 내부 SyntaxErrorNext.js -> setupFilesAfterEnv, transform, testEnvironment 등의 jest 설정을 보완하여 해결

--

2. React Hook의 비동기 데이터 처리와 실시간 UI 업데이트 메커니즘 완벽 이해
- 목표: React Hook을 활용하여 비동기 데이터 스트림(SSE)을 처리하고, 실시간 데이터 수신에 따라 각 컴포넌트가 UI를 동적으로 업데이트하도록 구현.
- 사용 기술: React + Next.js (App Router) + SSE (Server-Sent Events) + npm
- 프론트엔드:
  ->1) React: 컴포넌트 기반 UI 구축, Hook(useState, useEffect, useContext)으로 상태 관리 및 비동기 처리.
  ->2) Next.js(App Router): 서버 및 클라이언트 컴포넌트 관리, API 라우트(/app/api/sse/route.js)로 SSE 스트리밍.
  ->3) JavaScript: 비동기 처리(EventSource), 상태 관리, 배열 및 객체 조작.
-백엔드: Node.js (Next.js API): SSE 스트림 구현, ReadableStream으로 데이터 전송.
- 도구: npm: 패키지 관리, 개발 서버 실행(npm run dev, npm run build)
2. 세부 작업 내용(진행중)
- 2.1) 프로젝트 구조 설계 및 기본 설정
 -> /app, /components, /context 디렉토리 구성
 -> /app/api/sse/route.js: SSE 서버 구축 및 JSON 데이터 스트리밍 로직 구현
 -> /context/SseContext.js: 커스텀 Hook useSse 및 전역 상태 관리 Provider 작성
- 2.2) SSE 구조 설계 및 데이터 스트림 구현
 -> SSE 메시지에 { text, position, player, path } 포함
 -> position, player, path 필드 설계(사다리 위치 및 수평 연결 정보 포함)
 -> 메시지를 수신 받으면 useState로 전역 상태 업데이트 처리
- 2.3) 사다리 UI 및 실시간 렌더링 구현
 -> /components/LadderBoard.js: <div>와 텍스트로 사다리와 플레이어의 위치 표기 (플레이어의 위치에 사다리 색상 변경)
 -> useSse, useState, useEffect로 실시간 위치 반영 및 UI 리렌더링
 -> transition: all 0.5s ease로 부드러운 애니메이션 구현
 -> /app/ladder/page.js 및 /components/Header.js에 실시간 메시지 표시
- 2.4) 에러 핸들링 및 안정성 강화
 -> SSE 연결 실패 시 2초 후 자동 재시도 로직 추가
 -> useState로 error 상태 관리, UI에 경고 문구 표시
