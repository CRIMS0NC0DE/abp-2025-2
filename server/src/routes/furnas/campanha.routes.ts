import { Router } from "express";
import { getAll } from "../../controllers/furnas/campanha.controller";

const router = Router();

router.get("/all", getAll);

export default router;
