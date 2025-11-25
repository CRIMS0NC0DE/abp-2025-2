# Dockerfile.dev
FROM node:22-alpine

WORKDIR /usr/src/app

# Copia apenas package.json para cache de dependências
COPY package*.json ./

# Instala TODAS as dependências (incluindo devDependencies)
RUN npm install

# Copia todo o código da aplicação
COPY . .

# Expõe a porta da API
EXPOSE 3000

# Roda o modo dev com ts-node-dev
CMD ["npm", "run", "dev"]