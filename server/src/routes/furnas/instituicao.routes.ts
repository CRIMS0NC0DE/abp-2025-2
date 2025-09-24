import { Router } from "express";
import { getAll } from "../../controllers/furnas/instituicao.controller";

const router = Router();

router.get("/all", getAll);

export default router;
