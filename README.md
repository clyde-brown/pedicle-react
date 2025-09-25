# Pedicle React - 의료진 차팅 보조 시스템

토스 디자인 스타일을 적용한 진료 프로세스 맞춤 차팅 보조 웹 애플리케이션입니다.

## ✨ 주요 기능

- 🗺️ **바디맵 기반 증상 입력**: 직관적인 인체 모형으로 증상 부위 선택
- 📸 **X-ray 이미지 업로드**: 의료 영상 첨부 및 관리
- 🔍 **해부학적 분석**: 체계적인 해부학적 구조 선택 및 분석
- 📋 **실시간 차팅**: 입력 데이터 기반 실시간 환자 차트 생성
- 📄 **환자 설명서 자동 생성**: PDF 내보내기 및 SMS/이메일 전송
- 🎨 **토스 디자인 시스템**: 모던하고 사용자 친화적인 UI/UX

## 🚀 빠른 시작

### 전제 조건
- Node.js 16.0 이상
- npm 또는 yarn

### 설치 및 실행
```bash
# 1. 프로젝트 클론
git clone https://github.com/clyde-brown/pedicle-react.git
cd pedicle-react

# 2. 의존성 설치
npm install

# 3. 개발 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하여 애플리케이션을 확인할 수 있습니다.

## 📖 상세 설치 가이드

처음 설치하시거나 React 환경이 없는 경우 [INSTALLATION.md](./INSTALLATION.md)를 참조하세요.

## 🎯 사용 방법

1. **환자 정보 확인**: 좌측 사이드바에서 환자 기본 정보 및 내원 이력 확인
2. **증상 입력**: 바디맵에서 증상 부위 선택 및 상세 증상 입력
3. **신체검사 기록**: 압통, SLR, 근력 등 신체검사 결과 입력
4. **X-ray 업로드**: 의료 영상 파일 업로드 (자동으로 설명서에 첨부됨)
5. **해부학적 분석**: 관련 해부학적 구조 선택
6. **치료 계획**: 치료 방법 선택 및 주의사항 확인
7. **설명서 생성**: 우측에서 실시간 생성되는 환자 설명서 확인 및 전송

## 🛠️ 사용 가능한 스크립트

### `npm start`
개발 모드로 앱을 실행합니다. [http://localhost:3000](http://localhost:3000)에서 확인할 수 있습니다.

### `npm test`
테스트 러너를 실행합니다.

### `npm run build`
프로덕션용 앱을 `build` 폴더에 빌드합니다.

### `npm run eject`
**주의: 이는 되돌릴 수 없는 작업입니다!**

## 📁 프로젝트 구조

```
src/
├── App.tsx          # 메인 애플리케이션 컴포넌트
├── App.css          # 토스 디자인 스타일시트
├── BodyMap.tsx      # 바디맵 컴포넌트
└── index.tsx        # 애플리케이션 진입점
```

## 🎨 디자인 시스템

이 프로젝트는 토스(TOSS) 디자인 시스템을 기반으로 합니다:

- **컬러**: 토스 블루 (#3182f6) 메인 컬러
- **타이포그래피**: Pretendard, -apple-system 폰트 스택
- **컴포넌트**: 12px 라운드 코너, 그림자 효과
- **인터랙션**: 부드러운 애니메이션 및 호버 효과

## 🔧 기술 스택

- **Frontend**: React 18, TypeScript
- **Styling**: CSS3, CSS Variables
- **Build Tool**: Create React App
- **Version Control**: Git

## 🌐 브라우저 지원

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📝 라이선스

이 프로젝트는 의료진을 위한 도구로 개발되었습니다. 실제 의료 환경에서 사용하기 전에 충분한 테스트와 검증이 필요합니다.

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 지원

문제가 발생하거나 질문이 있는 경우 GitHub Issues에 문제를 보고해 주세요.

---

**Made with ❤️ for Healthcare Professionals**