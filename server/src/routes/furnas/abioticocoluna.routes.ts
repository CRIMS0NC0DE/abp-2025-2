import { Router } from "express";
// Importe o novo controller
import { getAll } from "../../controllers/furnas/abioticocoluna.controller";

const router = Router();

// A rota continua sendo '/', pois o caminho completo é montado antes
router.get("/", getAll);

export default router;