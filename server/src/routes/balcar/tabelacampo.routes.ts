import { Router } from "express";
import { getTabelaCampo } from "../../controllers/balcar/tabelacampo.controller";

const router = Router();

router.get("/all", getTabelaCampo);

export default router;
