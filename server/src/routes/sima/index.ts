import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";
import estacao from "./estacao.routes";

const router = express.Router();

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);
router.use("/estacao", estacao);

export default router;
