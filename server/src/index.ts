import express, { Request, Response } from "express";
import dotenv from "dotenv";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import { corsOptions } from "./configs/corsConfig";

// Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// Inicializa a aplicação Express
const app = express();

// habilitar CORS
app.use(cors(corsOptions));

// Define a porta utilizada pelo servidor
const PORT = process.env.PORT || 3000;

// Middleware para permitir o envio de dados em formato JSON no corpo das requisições
app.use(express.json());

// Middleware para permitir o envio de dados em formato URL-encoded no corpo das requisições
app.use(express.urlencoded({ extended: true }));

// Rotas principais
app.use("/", router);

// Middleware para rotas não encontradas
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: "Rota não encontrada",
  });
});

// middleware de erro sempre por último
app.use(errorHandler);

// Inicializa o servidor na porta definida
app.listen(PORT, function () {
  console.log(`Servidor rodando em http://localhost:${process.env.HOST_PORT}`);
});
