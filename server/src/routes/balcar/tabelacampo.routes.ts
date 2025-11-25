import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/balcar/tabelaCampo.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idtabelacampo", getById);
router.post("/export", exportData);

export default router;
