import { Router } from "express";
import { getAll, getById } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idinstituicao", getById);

export default router;