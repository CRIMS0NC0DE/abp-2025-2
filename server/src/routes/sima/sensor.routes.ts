import {Router} from 'express';
import { getAll, getById } from '../../controllers/sima/sensor.controller';

const router = Router();

router.get("/all", getAll);
router.get("/:idSensor", getById);

export default router;