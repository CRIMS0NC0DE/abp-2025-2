import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/carbono.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idCarbono", getById);
router.post("/export", exportData);


export default router;