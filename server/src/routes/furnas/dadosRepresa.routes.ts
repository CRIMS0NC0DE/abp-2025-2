import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/dadosRepresa.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDadosRepresa", getById);

export default router;