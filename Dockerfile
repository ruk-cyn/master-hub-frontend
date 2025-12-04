# --- Stage 1: Build ---
FROM node:20-alpine AS builder

# กำหนด Working Directory
WORKDIR /app

# คัดลอกไฟล์ package เพื่อ install dependencies ก่อน (ช่วยเรื่อง cache layer)
COPY package*.json ./

# ติดตั้ง dependencies (ใช้ npm ci จะเร็วกว่าและแม่นยำกว่า npm install สำหรับ ci/cd)
RUN npm ci

# คัดลอก Source Code ทั้งหมด
COPY . .

# สั่ง Build (จะได้โฟลเดอร์ dist ออกมา)
RUN npm run build

# --- Stage 2: Serve with Nginx ---
FROM nginx:alpine

# คัดลอกไฟล์ที่ Build แล้วจาก Stage 1 ไปไว้ที่ folder ของ Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# คัดลอกไฟล์ Config Nginx (ที่เราจะสร้างในขั้นตอนถัดไป) ไปทับค่า default
COPY nginx.conf /etc/nginx/conf.d/default.conf

# เปิด Port 80
EXPOSE 80

# รัน Nginx
CMD ["nginx", "-g", "daemon off;"]