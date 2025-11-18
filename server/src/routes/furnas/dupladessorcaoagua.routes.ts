import { Router } from "express";
import { getAll } from "../../controllers/furnas/dupladessorcaoagua.controller";

const router = Router();

router.get("/all", getAll);

export default router;
