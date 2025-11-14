import { Router } from "express";
import {getAll, getById} from "../../controllers/balcar/tabelaCampo.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idtabelacampo", getById);

export default router;
