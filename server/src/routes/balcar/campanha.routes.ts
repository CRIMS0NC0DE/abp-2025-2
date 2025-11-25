import { Router } from "express";
import { getAll, getById, exportData} from "../../controllers/balcar/campanha.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idcampanha", getById);
router.post("/export", exportData);

export default router;