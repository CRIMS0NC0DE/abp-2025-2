import { Router } from "express";
import { getCampanhaporTabela } from "../../controllers/furnas/campanhaportabela.controller";

const router = Router();

router.get("/all", getCampanhaporTabela);

export default router;
