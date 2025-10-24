import { Router } from "express";
import { getAll } from "../../controllers/furnas/medidacamposuperficie.controller";

const router = Router();
router.get("/", getAll);
export default router;
