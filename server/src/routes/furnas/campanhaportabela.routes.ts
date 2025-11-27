import { Router } from "express";
import {getAll, getById, exportData} from "../../controllers/furnas/campanhaportabela.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idCampanha/:idTabela", getById);
router.post("/export", exportData);


export default router;
