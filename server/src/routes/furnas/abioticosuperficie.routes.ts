import { Router } from "express";
import { getAbioticoSuperficie} from "../../controllers/furnas/abioticosuperficie.controller";

const router = Router();

router.get("/all", getAbioticoSuperficie);

export default router;
