import { Router } from "express";
import { getAll } from "../../controllers/balcar/tabelacampo.controller";

const router = Router();

router.get("/all", getAll);

export default router;
