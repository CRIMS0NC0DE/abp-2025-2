import { Router } from "express";
import {getAll, getById} from "../../controllers/balcar/sitio.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idsitio", getById);

export default router;
