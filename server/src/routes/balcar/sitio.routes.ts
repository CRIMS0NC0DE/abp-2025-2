import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/balcar/sitio.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idsitio", getById);
router.post("/export", exportData);


export default router;
