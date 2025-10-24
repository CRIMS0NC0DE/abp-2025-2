import { Router } from "express";
import { getAll } from "../../controllers/furnas/fluxocarbono.controller";

const router = Router();
router.get("/", getAll);
export default router;
