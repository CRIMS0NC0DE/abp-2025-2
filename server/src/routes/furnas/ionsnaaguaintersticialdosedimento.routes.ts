import { Router } from "express";
import { getAll } from "../../controllers/furnas/ionsnaaguaintersticialdosedimento.controller";

const router = Router();
router.get("/", getAll);
export default router;
