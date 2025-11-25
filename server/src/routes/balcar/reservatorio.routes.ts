import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/balcar/reservatorio.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idreservatorio", getById);
router.post("/export", exportData);


export default router;
