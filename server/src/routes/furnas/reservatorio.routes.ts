import { Router } from "express";
import { getAll } from "../../controllers/furnas/reservatorio.controller";

const router = Router();

router.get("/all", getAll);

export default router;
