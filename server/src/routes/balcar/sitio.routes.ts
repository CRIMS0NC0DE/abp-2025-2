import { Router } from "express";
import { getAll } from "../../controllers/balcar/sitio.controller";

const router = Router();

router.get("/all", getAll);

export default router;
