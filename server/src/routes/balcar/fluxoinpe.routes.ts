import { Router } from "express";
import { getAll } from "../../controllers/balcar/fluxoinpe.controller";

const router = Router();

// Define a rota GET para a raiz ("/") que chama a função getAll do controller
router.get("/", getAll);

export default router;