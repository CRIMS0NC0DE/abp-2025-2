import { Router } from "express";
import { getCampanhaFurnas } from "../../controllers/furnas/campanha.controller";

const router = Router();

router.get("/all", getCampanhaFurnas);

export default router;
