import { Router } from "express";
import { getInstituicaoBalcar } from "../../controllers/balcar/instituicao.controller";

const router = Router();

router.get("/all", getInstituicaoBalcar);

export default router;
