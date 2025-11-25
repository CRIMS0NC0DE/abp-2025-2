import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/campoPorTabela.controller"

const router = Router();

router.get("/all", getAll);
router.get("/:idCampoPorTabela", getById);
router.post("/export", exportData);


export default router;