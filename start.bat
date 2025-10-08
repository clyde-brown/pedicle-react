@echo off
REM Pedicle React 원클릭 설치 및 실행 스크립트 (Windows)
REM 압축 해제 후 이 스크립트 하나만 실행하면 모든 설치와 실행이 완료됩니다.

echo 🏥 Pedicle React 원클릭 설치 및 실행
echo ==================================
echo.

REM Node.js 확인
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js가 필요합니다.
    echo https://nodejs.org 에서 설치 후 다시 실행해주세요.
    pause
    exit /b 1
)

echo ✅ Node.js 확인됨
node --version

REM 의존성 설치 (node_modules가 없는 경우에만)
if not exist "node_modules" (
    echo 📦 의존성 패키지 설치 중...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ 설치 실패
        pause
        exit /b 1
    )
    echo ✅ 설치 완료!
) else (
    echo ✅ 의존성 패키지 이미 설치됨
)

echo.
echo 🚀 개발 서버를 시작합니다...
echo 브라우저에서 http://localhost:3000 으로 접속하세요.
echo.
echo 서버를 중지하려면 Ctrl+C를 누르세요.
echo.

REM 개발 서버 실행
npm start


