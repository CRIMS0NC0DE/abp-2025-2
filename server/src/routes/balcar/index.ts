
import express from "express";
import fluxoInpe from "./fluxoInpe.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import sitio from "./sitio.routes";
import reservatorio from "./reservatorio.routes";
import tabelaCampo from "./tabelaCampo.routes";

const router = express.Router();

router.use("/fluxo-inpe", fluxoInpe);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/sitio", sitio);
router.use("/reservatorio", reservatorio);
router.use("/tabela-campo", tabelaCampo);

export default router;

