import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/campoPorTabela.controller"

const router = Router();

router.get("/all", getAll);
router.get("/:idCampoPorTabela", getById);

export default router;