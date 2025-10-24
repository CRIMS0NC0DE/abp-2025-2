import { Router } from "express";
import { getAll } from "../../controllers/furnas/campanha.controller";

const router = Router();
router.get("/", getAll);
export default router;
