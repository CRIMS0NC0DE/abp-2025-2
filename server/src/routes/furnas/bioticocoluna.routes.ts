import { Router } from "express";
import { getBioticoColuna } from "../../controllers/furnas/bioticocoluna.controller";

const router = Router();

router.get("/all", getBioticoColuna);

export default router;
