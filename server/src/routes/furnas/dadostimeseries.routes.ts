import { Router } from "express";
import { getDadosTimeSeries } from "../../controllers/furnas/dadostimeseries.controller";

const router = Router();

router.get("/", getDadosTimeSeries);

export default router;
