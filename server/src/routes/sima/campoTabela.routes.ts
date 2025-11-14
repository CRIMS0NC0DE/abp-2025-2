import { Router } from "express";
import { getAll, getById } from "../../controllers/sima/campoTabela.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idcampotabela", getById);

export default router;