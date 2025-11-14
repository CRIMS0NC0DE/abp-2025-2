import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/concentracaoGasAgua.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idConcentracaoGasAgua", getById);

export default router;