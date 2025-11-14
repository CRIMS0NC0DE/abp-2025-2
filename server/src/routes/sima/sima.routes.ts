import { Router } from "express";
import { getAll, getById } from "../../controllers/sima/sima.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idsima", getById);

export default router;