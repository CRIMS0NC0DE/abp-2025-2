import {Router} from 'express';
import { getAll, getById, exportData } from '../../controllers/sima/sensor.controller';

const router = Router();

router.get("/all", getAll);
router.get("/:idSensor", getById);
router.post("/export", exportData);

export default router;