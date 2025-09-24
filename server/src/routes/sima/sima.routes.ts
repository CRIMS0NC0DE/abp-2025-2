import { Router } from "express";
import { getAll, getByEstacao, getEstacoes } from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);
router.get("/porestacao", getByEstacao);
router.get("/estacoes", getEstacoes);

export default router;
