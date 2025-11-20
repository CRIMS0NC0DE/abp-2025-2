import { Router } from "express";
import { getReservatorioBalcar } from "../../controllers/balcar/reservatorio.controller";

const router = Router();

router.get("/all", getReservatorioBalcar);

export default router;
