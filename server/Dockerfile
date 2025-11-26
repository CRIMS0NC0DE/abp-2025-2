FROM node:22-alpine

WORKDIR /usr/src/app

# Copia apenas package.json para cache de dependências
COPY package*.json ./

# Instala TODAS as dependências
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Expõe a porta da API
EXPOSE 3000

# OBS: Para produção real, o ideal seria 'npm run build' e depois 'npm start',
# mas para rodar igual ao seu dev por enquanto, pode manter assim:
CMD ["npm", "run", "dev"]
