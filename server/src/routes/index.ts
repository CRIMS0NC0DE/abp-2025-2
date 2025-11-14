import express from "express";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";

const router = express.Router();

router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.use("/sima", sima);

export default router;
