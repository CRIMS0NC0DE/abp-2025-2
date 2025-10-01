# Etapa 1: build da aplicação
FROM node:22-alpine AS build

# Criar diretório de trabalho
WORKDIR /usr/src/app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código
COPY . .

# Compilar TypeScript
RUN npm run build

# Etapa 2: imagem final
FROM node:22-alpine

WORKDIR /usr/src/app

# Copiar apenas os arquivos necessários da etapa de build
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist

# Expor a porta (ajuste se necessário)
EXPOSE 3000

# Comando de inicialização
CMD ["node", "dist/index.js"]

