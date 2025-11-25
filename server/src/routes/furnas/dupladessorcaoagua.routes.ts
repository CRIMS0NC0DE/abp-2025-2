import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/duplaDessorcaoAgua.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDuplaDessorcaoAgua", getById);
router.post("/export", exportData);


export default router;