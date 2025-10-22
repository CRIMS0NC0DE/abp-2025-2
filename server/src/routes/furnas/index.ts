import express from "express";
// 1. IMPORTE A NOVA ROTA AQUI
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";

const router = express.Router();

// 2. REGISTRE A ROTA AQUI
router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);

export default router;