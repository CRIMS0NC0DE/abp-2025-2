import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/dadosRepresa.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDadosRepresa", getById);
router.post("/export", exportData);


export default router;