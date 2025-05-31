# mono-repo

### 폴더 구조
```bash

my-monorepo/
├── apps/
│   ├── app1/
│   └── app2/
├── packages/
│   └── common/
├── turbo.json
├── package.json
└── pnpm-workspace.yaml
```

### 1️⃣ 초기 세팅
```bash

mkdir my-monorepo
cd my-monorepo
pnpm init
pnpm add -D turbo
```

### 2️⃣ `pnpm workspace` 설정
`pnpm-workspace.yaml` 파일 생성
```yaml
packages:
  - apps/*
  - packages/*
```

### 3️⃣ turborepo 설치 및 설정
```bash

pnpm add -D turbo
```
`turbo.json` 파일 생성:
```json
{
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false
    }
  }
}
```

### 4️⃣ common 패키지 만들기 (공통 함수/컴포넌트)
```bash

mkdir -p packages/common
cd packages/common
pnpm init -y
pnpm add react
pnpm add -D typescript

# tsconfig 생성
npx tsc --init
```
`packages/common/tsconfig.json` 예시:
```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "dist/types",
    "emitDeclarationOnly": false,
    "esModuleInterop": true,
    "jsx": "react-jsx",
    "module": "ESNext",
    "moduleResolution": "Node",
    "outDir": "dist",
    "target": "ESNext",
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
`packages/common/package.json` 예시:
```json
{
  "name": "common",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "build": "turbo run build",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "신재훈",
  "license": "ISC",
  "packageManager": "pnpm@10.11.0",
  "dependencies": {
    "react": "^19.1.0"
  },
  "devDependencies": {
    "typescript": "^5.8.3"
  }
}
```

### 5️⃣ 앱 프로젝트 (app1, app2) 생성
```bash

pnpm create vite apps/app1 --template react-ts
pnpm create vite apps/app2 --template react-ts
```
`apps/app1/vite.config.ts` 예시:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@common': path.resolve(__dirname, '../../packages/common/src'),
      "@common/components": path.resolve(__dirname, '../../packages/common/src/components'),
      "@common/utils": path.resolve(__dirname, '../../packages/common/src/utils'),
    }
  }
})
```
`pnpm`으로 공통 패키지 의존성 추가:
```bash

cd apps/app1
pnpm add common --workspace
cd ../app2
pnpm add common --workspace
```

### 6️⃣ Turbo 명령어 실행 예시
```bash

pnpm turbo run build
pnpm turbo run dev --filter=app1
```

### 루트 package.json에 스크립트 추가 (선택)
```json
{
  "scripts": {
    "dev:app1": "turbo run dev --filter=app1",
    "dev:app2": "turbo run dev --filter=app2",
    "build": "turbo run build"
  }
}
```