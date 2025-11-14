import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/carbono.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idCarbono", getById);

export default router;