import { Router } from "express";
// 1. Importa a nova função 'exportData' do controller
import {
	getAll,
	getById,
	exportData,
} from "../../controllers/furnas/abioticoColuna.controller";

const router = Router();

// Rotas existentes
router.get("/all", getAll);
router.get("/:idabioticocoluna", getById);

// 2. Adiciona a nova rota de exportação (usando POST)
router.post("/export", exportData);

export default router;