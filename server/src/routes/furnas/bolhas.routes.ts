import { Router } from "express";
import { getBolhas } from "../../controllers/furnas/bolhas.controller";

const router = Router();

router.get("/all", getBolhas);

export default router;
