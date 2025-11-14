import { Router } from "express";
import {getAll, getById} from "../../controllers/balcar/reservatorio.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idreservatorio", getById);

export default router;
