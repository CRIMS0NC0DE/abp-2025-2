import { Router } from "express";
import { getAll } from "../../controllers/furnas/difusao.controller";

const router = Router();
router.get("/", getAll);
export default router;
