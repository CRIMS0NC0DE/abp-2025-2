import { Router } from "express";
import { getAll, getAllSimple, getAllForMap } from "../../controllers/sima/estacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/simple", getAllSimple);
router.get("/map", getAllForMap);

export default router;
