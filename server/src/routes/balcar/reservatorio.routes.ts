import { Router } from "express";
import { getAll } from "../../controllers/balcar/reservatorio.controller";

const router = Router();

router.get("/all", getAll);

export default router;
