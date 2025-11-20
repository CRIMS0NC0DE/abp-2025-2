import { Router } from "express";
import { getFluxoinpe } from "../../controllers/balcar/fluxoinpe.controller";

const router = Router();

router.get("/all", getFluxoinpe);

export default router;
