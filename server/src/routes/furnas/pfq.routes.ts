import { Router } from "express";
import { getAll, getById, exportData } from "../../controllers/furnas/pfq.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:id", getById);
router.post("/export", exportData);


export default router;
