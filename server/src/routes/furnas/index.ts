import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";

const router = express.Router();

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);

export default router;
