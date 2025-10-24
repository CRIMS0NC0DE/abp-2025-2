import { Router } from "express";
import { getAll } from "../../controllers/furnas/dupladessorcaoagua.controller";

const router = Router();
router.get("/", getAll);
export default router;
