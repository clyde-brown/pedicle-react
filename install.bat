@echo off
REM Pedicle React 자동 설치 스크립트 (Windows)
REM 사용법: install.bat

echo 🏥 Pedicle React 설치를 시작합니다...
echo =======================================

REM Node.js 설치 확인
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js가 설치되어 있지 않습니다.
    echo https://nodejs.org 에서 Node.js LTS 버전을 다운로드하여 설치해주세요.
    echo 설치 후 컴퓨터를 재부팅하고 다시 실행해주세요.
    pause
    exit /b 1
)

REM Node.js 버전 표시
echo ✅ Node.js 확인됨
node --version

REM npm 버전 표시
echo ✅ npm 확인됨
npm --version

REM Git 설치 확인
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git이 설치되어 있지 않습니다.
    echo https://git-scm.com/download/win 에서 Git을 다운로드하여 설치해주세요.
    pause
    exit /b 1
)

echo ✅ Git 확인됨
git --version

echo.

REM 의존성 설치
echo 📦 의존성 패키지를 설치합니다...
npm install
if %errorlevel% neq 0 (
    echo ❌ 의존성 설치 실패. 다음을 시도해보세요:
    echo   npm cache clean --force
    echo   rmdir /s /q node_modules
    echo   del package-lock.json
    echo   npm install
    pause
    exit /b 1
)

echo ✅ 의존성 설치 완료!
echo.
echo 🎉 설치가 완료되었습니다!
echo =======================================
echo.
echo 🚀 개발 서버를 시작하려면:
echo   npm start
echo.
echo 🌐 브라우저에서 다음 주소로 접속:
echo   http://localhost:3000
echo.
echo 📖 자세한 사용법은 README.md를 참조하세요.
echo.
echo ❓ 문제가 발생하면 INSTALLATION.md를 확인하세요.
echo.
pause
