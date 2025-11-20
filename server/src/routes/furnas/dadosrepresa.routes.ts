import { Router } from "express";
import { getDadosRepresa } from "../../controllers/furnas/dadosrepresa.controller";

const router = Router();

router.get("/all", getDadosRepresa);

export default router;
