import { Router } from "express";
import { getAll } from "../../controllers/furnas/fluxodifusivo.controller";

const router = Router();
router.get("/", getAll);
export default router;
