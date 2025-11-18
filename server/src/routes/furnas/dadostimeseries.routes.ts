import { Router } from "express";
import { getAll } from "../../controllers/furnas/dadostimeseries.controller";

const router = Router();

router.get("/", getAll);

export default router;
