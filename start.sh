#!/bin/bash

# Pedicle React 원클릭 설치 및 실행 스크립트
# 압축 해제 후 이 스크립트 하나만 실행하면 모든 설치와 실행이 완료됩니다.

echo "🏥 Pedicle React 원클릭 설치 및 실행"
echo "=================================="
echo ""

# Node.js 확인
if ! command -v node &> /dev/null; then
    echo "❌ Node.js가 필요합니다."
    echo "https://nodejs.org 에서 설치 후 다시 실행해주세요."
    exit 1
fi

echo "✅ Node.js $(node --version) 확인됨"

# 의존성 설치 (node_modules가 없는 경우에만)
if [ ! -d "node_modules" ]; then
    echo "📦 의존성 패키지 설치 중..."
    npm install
    if [ $? -ne 0 ]; then
        echo "❌ 설치 실패"
        exit 1
    fi
    echo "✅ 설치 완료!"
else
    echo "✅ 의존성 패키지 이미 설치됨"
fi

echo ""
echo "🚀 개발 서버를 시작합니다..."
echo "브라우저에서 http://localhost:3000 으로 접속하세요."
echo ""
echo "서버를 중지하려면 Ctrl+C를 누르세요."
echo ""

# 개발 서버 실행
npm start


