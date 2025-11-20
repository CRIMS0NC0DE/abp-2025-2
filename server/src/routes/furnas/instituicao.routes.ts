import { Router } from "express";
import { getInstituicaoFurnas } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getInstituicaoFurnas);

export default router;
