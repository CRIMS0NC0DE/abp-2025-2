import { Router } from "express";
import { getAll } from "../../controllers/furnas/abioticosuperficie.controller";

const router = Router();

router.get("/all", getAll);

export default router;
