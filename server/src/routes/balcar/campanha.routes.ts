import { Router } from "express";
import { getAll, getById } from "../../controllers/balcar/campanha.controller";

const router = Router();

router.get("/all", getAll);
router.get("/:idcampanha", getById);

export default router;