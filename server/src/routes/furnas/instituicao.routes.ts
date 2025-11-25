import { Router } from "express";
import { getAll, getById, exportData } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idinstituicao", getById);
router.post("/export", exportData);


export default router;