# Используем официальный образ Node.js
FROM node:20-alpine 

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы
COPY . .

# Строим приложение
RUN npm run build

# Запускаем приложение
CMD ["npm", "run", "preview"]
