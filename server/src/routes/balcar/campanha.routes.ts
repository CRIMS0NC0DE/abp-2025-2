import { Router } from "express";
import { getCampanhaBalcar } from "../../controllers/balcar/campanha.controller";


const router = Router();

router.get("/all", getCampanhaBalcar);

export default router;
