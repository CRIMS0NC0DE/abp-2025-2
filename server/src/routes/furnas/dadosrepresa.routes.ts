import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/dadosrepresa.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDadosRepresa", getById);
router.post("/export", exportData);


export default router;
