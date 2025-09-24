import express from "express";
import fluxoinpe from "./fluxoinpe.routes";

const router = express.Router();

router.use("/fluxoinpe", fluxoinpe);

export default router;
