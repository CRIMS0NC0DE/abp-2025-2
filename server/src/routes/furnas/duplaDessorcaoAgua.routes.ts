import { Router } from "express";
import {getAll, getById} from "../../controllers/furnas/duplaDessorcaoAgua.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idDuplaDessorcaoAgua", getById);

export default router;