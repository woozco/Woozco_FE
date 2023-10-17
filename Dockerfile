# 1단계: Node.js 빌드 환경 설정
FROM node:16 AS build

WORKDIR /app

# 앱 종속성 설치
COPY package*.json ./
RUN yarn install

# 앱 소스 복사
COPY . .

# 애플리케이션 빌드
RUN yarn build

# 2단계: 프로덕션 환경 설정
FROM node:16

WORKDIR /app

# 1단계에서 빌드한 애플리케이션 파일 복사
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY package*.json ./

# 앱 종속성 설치
RUN yarn install --only=production

# 애플리케이션 실행
CMD [ "yarn", "start" ]

