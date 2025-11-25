import { Router } from "express";
import { getAll, getById, exportData } from "../../controllers/sima/campoTabela.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idcampotabela", getById);
router.post("/export", exportData);


export default router;