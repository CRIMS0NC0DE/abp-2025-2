import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/campanhaPorTabela.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idCampanha/:idTabela", getById);

export default router;