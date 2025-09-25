# Pedicle React Dockerfile
# Node.js 18 Alpine 이미지 사용 (경량화)
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# 시스템 의존성 설치
RUN apk add --no-cache git

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci --only=production

# 소스 코드 복사
COPY . .

# 애플리케이션 빌드
RUN npm run build

# 정적 파일 서빙을 위한 serve 설치
RUN npm install -g serve

# 포트 3000 노출
EXPOSE 3000

# 컨테이너 시작 명령어
CMD ["serve", "-s", "build", "-l", "3000"]

# 개발용 Dockerfile
# FROM node:18-alpine
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .
# EXPOSE 3000
# CMD ["npm", "start"]
