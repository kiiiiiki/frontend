# Stage 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# package.json과 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm install

# 소스 코드 복사
COPY . .

# 빌드 인자 설정 (docker-compose.yml에서 전달)
ARG VITE_API_URL=http://localhost:8000
ARG VITE_LOGIN_API_URL=http://localhost:8080

# 환경 변수로 설정
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_LOGIN_API_URL=$VITE_LOGIN_API_URL

# 프로덕션 빌드
RUN npm run build

# Stage 2: Runtime with Nginx
FROM nginx:alpine

# Nginx 설정 파일 복사 (아래에서 생성)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일 복사
COPY --from=build /app/dist /usr/share/nginx/html

# 포트 노출
EXPOSE 80

# Nginx 실행
CMD ["nginx", "-g", "daemon off;"]
