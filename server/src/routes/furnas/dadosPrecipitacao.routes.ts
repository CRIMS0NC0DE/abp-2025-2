import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/dadosPrecipitacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDadosPrecipitacao", getById);
router.post("/export", exportData);


export default router;