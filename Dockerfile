# 1️⃣ Node.js ile React uygulamasını build et
FROM node:18-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 2️⃣ Nginx ile yayına al
FROM nginx:alpine

# Özel Nginx konfigürasyonunu ekle
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Build edilen dosyaları Nginx’in HTML dizinine kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
