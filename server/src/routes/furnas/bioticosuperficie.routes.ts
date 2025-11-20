import { Router } from "express";
import { getBioticoSuperficie } from "../../controllers/furnas/bioticosuperficie.controller";

const router = Router();

router.get("/all", getBioticoSuperficie);

export default router;
