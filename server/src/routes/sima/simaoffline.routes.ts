import { Router } from "express";
import {getAll, getById, exportData} from '../../controllers/sima/simaOffline.controller';

const router = Router();


router.get("/all", getAll);
router.get("/:idsimaoffline", getById);
router.post("/export", exportData);

export default router;