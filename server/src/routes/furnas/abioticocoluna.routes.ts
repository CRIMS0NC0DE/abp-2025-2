import { Router } from "express";
import { getAbioticoColuna } from "../../controllers/furnas/abioticocoluna.controller";

const router = Router();

router.get("/all", getAbioticoColuna);

export default router;
