import { Router } from "express";
import { getCarbono } from "../../controllers/furnas/carbono.controller";

const router = Router();

router.get("/all", getCarbono);

export default router;
