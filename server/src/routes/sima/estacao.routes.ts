import { Router } from "express";
import { getAll,getById } from "../../controllers/sima/estacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idestacao", getById);

export default router;