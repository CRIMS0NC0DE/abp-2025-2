# Etapa única para desenvolvimento
FROM node:22-alpine

# diretório de trabalho
WORKDIR /usr/src/app

# copiar package.json e package-lock.json para instalar dependências
COPY package*.json ./

# instalar dependências
RUN npm install

# expor a porta do Vite
EXPOSE 5173

# O comando final é definido no docker-compose (npm run dev -- --host)