import { Router } from "express";
import { getAll } from "../../controllers/furnas/medidacampocoluna.controller";

const router = Router();
router.get("/", getAll);
export default router;
