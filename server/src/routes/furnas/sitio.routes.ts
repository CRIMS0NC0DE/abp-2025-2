import { Router } from "express";
import { getSitioFurnas } from "../../controllers/furnas/sitio.controller";

const router = Router();

router.get("/all", getSitioFurnas);

export default router;
