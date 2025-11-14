import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/horiba.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idHoriba", getById);

export default router;