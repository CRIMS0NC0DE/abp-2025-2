import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/fluxoDifusivo.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idFluxoDifusivo", getById);

export default router;