import express from "express";
import reservatorio from "./reservatorio.routes";
import instituicao from "./instituicao.routes";
import tabelacampo from "./tabelacampo.routes";
import campanha from "./campanha.routes";
import fluxoinpe from "./fluxoinpe.routes";
import sitio from "./sitio.routes";

const router = express.Router();

router.use("/reservatorio", reservatorio);
router.use("/instituicao", instituicao);
router.use("/tabelacampo", tabelacampo);
router.use("/campanha", campanha);
router.use("/fluxoinpe", fluxoinpe);
router.use("/sitio", sitio);

export default router;
