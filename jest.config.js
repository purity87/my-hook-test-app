module.exports = {
    testEnvironment: 'jsdom', // DOM 환경 시뮬레이션
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Next.js 절대 경로 지원
    },
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // JavaScript/JSX 파일 변환
    },
    testMatch: [
        // '**/__tests__/**/*.test.js', // .test.js 파일만 대상
        '**/src/hooks/__tests__/**/*.test.js', // hooks 테스트만 포함
        '**/?(*.)+(spec|test).js',
    ],
    testPathIgnorePatterns: ['/node_modules/', '/.git/', '\\.sh$', '\\.txt$', '\\.md$'], // .sh 파일 제외
};