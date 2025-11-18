import { Router } from "express";
import { getAll } from "../../controllers/furnas/carbono.controller";

const router = Router();

router.get("/all", getAll);

export default router;
