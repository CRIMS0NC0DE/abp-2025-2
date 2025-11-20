import { Router } from "express";
import { getReservatorioFurnas } from "../../controllers/furnas/reservatorio.controller";

const router = Router();

router.get("/all", getReservatorioFurnas);

export default router;
