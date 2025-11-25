import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/concentracaoGasSedimento.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idConcentracaoGasSedimento", getById);
router.post("/export", exportData);


export default router;