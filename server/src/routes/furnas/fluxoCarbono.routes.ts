import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/fluxoCarbono.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoCarbono", getById);

export default router;