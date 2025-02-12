# Используем официальный образ Node.js
FROM node:20

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы
COPY package*.json ./
RUN npm install

# Копируем исходники
COPY . .

# Открываем порт 3001 (если API работает на нём)
EXPOSE 3001

# Запускаем сервер
CMD ["npm", "start"]
