import express from "express";

// Importe todas as rotas específicas do grupo "balcar" aqui
import fluxoinpeRoutes from "./fluxoinpe.routes";
// Exemplo: import campanhaBalcarRoutes from "./campanha.routes";

const router = express.Router();

// Registre cada rota com seu respectivo caminho
// Quando a URL for /api/balcar/fluxoinpe, esta linha direciona para o arquivo importado
router.use("/fluxoinpe", fluxoinpeRoutes);
// Exemplo: router.use("/campanha", campanhaBalcarRoutes);

export default router;