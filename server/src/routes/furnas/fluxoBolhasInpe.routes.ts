import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/fluxoBolhasInpe.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoBolhasInpe", getById);

export default router;