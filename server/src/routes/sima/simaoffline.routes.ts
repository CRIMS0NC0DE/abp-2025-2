import { Router } from "express";
import { getAll } from "../../controllers/sima/simaoffline.controller";

const router = Router();

router.get("/all", getAll);

export default router;
