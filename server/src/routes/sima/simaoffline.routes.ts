import { Router } from "express";
import {getAll, getById} from '../../controllers/sima/simaOffline.controller';

const router = Router();

router.get("/all", getAll);
router.get("/:idsimaoffline", getById);

export default router;