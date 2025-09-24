import express from "express";
import sima from "./sima.routes";
import simaoffline from "./simaoffline.routes";

const router = express.Router();

router.use("/sima", sima);
router.use("/simaoffline", simaoffline);

export default router;
