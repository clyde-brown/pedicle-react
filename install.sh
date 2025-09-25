#!/bin/bash

# Pedicle React 자동 설치 스크립트 (macOS/Linux)
# 사용법: bash install.sh

echo "🏥 Pedicle React 설치를 시작합니다..."
echo "======================================="

# Node.js 설치 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 설치되어 있지 않습니다."
    echo "다음 중 하나의 방법으로 Node.js를 설치해주세요:"
    echo ""
    echo "macOS (Homebrew):"
    echo "  brew install node"
    echo ""
    echo "Ubuntu/Debian:"
    echo "  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    echo ""
    echo "또는 https://nodejs.org 에서 직접 다운로드하세요."
    exit 1
fi

# Node.js 버전 확인
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js 버전이 너무 낮습니다. (현재: $(node --version), 필요: v16+)"
    echo "Node.js를 업데이트해주세요."
    exit 1
fi

echo "✅ Node.js $(node --version) 확인됨"
echo "✅ npm $(npm --version) 확인됨"

# Git 설치 확인
if ! command -v git &> /dev/null; then
    echo "❌ Git이 설치되어 있지 않습니다."
    echo "Git을 설치해주세요: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git $(git --version | cut -d' ' -f3) 확인됨"
echo ""

# 의존성 설치
echo "📦 의존성 패키지를 설치합니다..."
if npm install; then
    echo "✅ 의존성 설치 완료!"
else
    echo "❌ 의존성 설치 실패. 다음을 시도해보세요:"
    echo "  npm cache clean --force"
    echo "  rm -rf node_modules package-lock.json"
    echo "  npm install"
    exit 1
fi

echo ""
echo "🎉 설치가 완료되었습니다!"
echo "======================================="
echo ""
echo "🚀 개발 서버를 시작하려면:"
echo "  npm start"
echo ""
echo "🌐 브라우저에서 다음 주소로 접속:"
echo "  http://localhost:3000"
echo ""
echo "📖 자세한 사용법은 README.md를 참조하세요."
echo ""
echo "❓ 문제가 발생하면 INSTALLATION.md를 확인하세요."
