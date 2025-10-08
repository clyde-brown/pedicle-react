# Pedicle React 프로젝트 설치 가이드

## 🚀 프로젝트 소개
Pedicle React는 의료진을 위한 진료 프로세스 맞춤 차팅 보조 시스템입니다. 바디맵 기반 증상 입력, X-ray 업로드, 해부학적 분석, 환자 설명서 생성 등의 기능을 제공합니다.

## 📋 시스템 요구사항

### 운영체제
- Windows 10/11
- macOS 10.15 이상
- Ubuntu 18.04 이상 또는 기타 Linux 배포판

### 필수 소프트웨어
- Node.js 16.0 이상
- npm 또는 yarn 패키지 매니저

## 🛠️ 설치 단계별 가이드

### 1단계: Node.js 설치

#### Windows
1. [Node.js 공식 웹사이트](https://nodejs.org/)에서 LTS 버전 다운로드
2. 다운로드한 `.msi` 파일 실행
3. 설치 마법사를 따라 진행 (기본 설정 권장)
4. 설치 완료 후 재부팅

#### macOS
```bash
# Homebrew 설치 (없는 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Node.js 설치
brew install node
```

#### Ubuntu/Linux
```bash
# Node.js 18.x 저장소 추가
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -

# Node.js 설치
sudo apt-get install -y nodejs

# 빌드 도구 설치 (필요한 경우)
sudo apt-get install -y build-essential
```

### 2단계: 설치 확인

터미널/명령 프롬프트에서 다음 명령어로 설치 확인:

```bash
node --version
npm --version
```

예상 출력:
```
v18.17.0
9.6.7
```

### 3단계: 프로젝트 파일 준비

압축파일을 다운로드 받은 후 압축을 해제합니다:

```bash
# 압축 해제 (파일명은 실제 다운로드한 파일명으로 변경)
unzip pedicle-react.zip
# 또는 tar 파일인 경우
tar -xzf pedicle-react.tar.gz

# 프로젝트 디렉토리로 이동
cd pedicle-react
```

### 4단계: 의존성 패키지 설치

```bash
# npm 사용
npm install

# 또는 yarn 사용 (yarn이 설치된 경우)
yarn install
```

설치 과정에서 다음과 같은 패키지들이 자동으로 설치됩니다:
- React 18.x
- TypeScript
- Create React App
- 기타 필요한 의존성 패키지들

## 🚀 실행 방법

### 방법 1: 직접 실행

#### 자동 설치 스크립트 사용 (권장)

**macOS/Linux:**
```bash
# 실행 권한 부여 (최초 1회)
chmod +x install.sh

# 자동 설치 실행
./install.sh
```

**Windows:**
```cmd
install.bat
```

#### 수동 설치

### 개발 서버 실행
```bash
# npm 사용
npm start

# 또는 yarn 사용
yarn start
```

성공적으로 실행되면:
- 브라우저가 자동으로 열립니다
- 주소: `http://localhost:3000`
- 콘솔에 "Compiled successfully!" 메시지 표시

### 프로덕션 빌드
```bash
# 빌드 생성
npm run build

# 빌드된 파일 확인
ls build/
```

### 방법 2: Docker 사용

Docker가 설치되어 있는 경우 컨테이너로 실행할 수 있습니다.

#### Docker 설치
- **Windows/macOS**: [Docker Desktop](https://www.docker.com/products/docker-desktop/) 설치
- **Linux**: [Docker Engine](https://docs.docker.com/engine/install/) 설치

#### Docker로 실행

**프로덕션 모드:**
```bash
# Docker Compose 사용
docker-compose up -d

# 또는 직접 Docker 사용
docker build -t pedicle-react .
docker run -p 3000:3000 pedicle-react
```

**개발 모드:**
```bash
# 개발용 프로필로 실행
docker-compose --profile dev up

# 또는 직접 실행
docker build -f Dockerfile.dev -t pedicle-react-dev .
docker run -p 3001:3000 -v $(pwd):/app -v /app/node_modules pedicle-react-dev
```

Docker 실행 후:
- **프로덕션**: http://localhost:3000
- **개발**: http://localhost:3001

## 🔧 문제 해결

### 자주 발생하는 문제들

#### 1. 포트 3000이 이미 사용 중인 경우
```bash
# 다른 포트로 실행
PORT=3001 npm start
```

#### 2. npm install 실패 시
```bash
# npm 캐시 정리
npm cache clean --force

# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

#### 3. 권한 오류 (macOS/Linux)
```bash
# npm 권한 설정
sudo chown -R $(whoami) ~/.npm
```

#### 4. Windows에서 긴 경로 이름 오류
관리자 권한으로 명령 프롬프트 실행 후:
```cmd
git config --system core.longpaths true
```

### 메모리 부족 오류
```bash
# Node.js 메모리 한도 증가
export NODE_OPTIONS="--max-old-space-size=4096"
npm start
```

## 📁 프로젝트 구조

```
pedicle-react/
├── public/                 # 정적 파일들
│   ├── index.html
│   └── favicon.ico
├── src/                    # 소스 코드
│   ├── App.tsx            # 메인 애플리케이션
│   ├── App.css            # 스타일시트
│   ├── BodyMap.tsx        # 바디맵 컴포넌트
│   └── index.tsx          # 애플리케이션 진입점
├── docs/                   # 문서
├── build/                  # 빌드된 파일들 (빌드 후 생성)
├── package.json           # 프로젝트 설정 및 의존성
└── README.md              # 프로젝트 설명
```

## 🌐 브라우저 호환성

지원되는 브라우저:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔄 업데이트 방법

새 버전이 출시되면:
1. 새로운 압축파일을 다운로드
2. 기존 폴더를 백업 (필요시)
3. 새 압축파일 해제
4. 프로젝트 폴더로 이동하여 `npm install` 실행

## 📞 지원 및 문의

문제가 발생하거나 질문이 있는 경우:
1. GitHub Issues에 문제 보고
2. 프로젝트 문서 확인
3. 개발팀에 문의

## 🎯 다음 단계

설치가 완료되면:
1. 브라우저에서 `http://localhost:3000` 접속
2. 바디맵에서 부위 선택 테스트
3. X-ray 이미지 업로드 테스트
4. 설명서 생성 기능 확인

---

**참고**: 이 프로젝트는 의료진을 위한 도구이므로, 실제 의료 환경에서 사용하기 전에 충분한 테스트와 검증이 필요합니다.
