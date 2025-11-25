import express from "express";
import sima from "./sima.routes";
import simaOffline from './simaOffline.routes'
import sensor from './sensor.routes';
import estacao from './estacao.routes';
import campotabela from './campoTabela.routes';

const router = express.Router();

router.use("/sima", sima);
router.use("/sima-offline", simaOffline);
router.use("/sensor", sensor);
router.use("/estacao", estacao);
router.use("/campo-tabela", campotabela);

export default router;

