import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/dadosPrecipitacao.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDadosPrecipitacao", getById);

export default router;