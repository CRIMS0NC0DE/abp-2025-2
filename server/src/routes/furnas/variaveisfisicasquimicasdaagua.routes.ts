import { Router } from "express";
import { getAll } from "../../controllers/furnas/variaveisfisicasquimicasdaagua.controller";

const router = Router();
router.get("/", getAll);
export default router;
