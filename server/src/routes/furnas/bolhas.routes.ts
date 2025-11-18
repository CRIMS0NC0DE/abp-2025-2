import { Router } from "express";
import { getAll } from "../../controllers/furnas/bolhas.controller";

const router = Router();

router.get("/all", getAll);

export default router;
