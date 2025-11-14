import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/concentracaoGasSedimento.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idConcentracaoGasSedimento", getById);

export default router;