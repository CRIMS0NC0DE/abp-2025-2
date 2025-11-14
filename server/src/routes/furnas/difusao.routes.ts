import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/difusao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDifusao", getById);

export default router;