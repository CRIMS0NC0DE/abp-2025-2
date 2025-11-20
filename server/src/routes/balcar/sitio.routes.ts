import { Router } from "express";
import { getSitioBalcar } from "../../controllers/balcar/sitio.controller";

const router = Router();

router.get("/all", getSitioBalcar);

export default router;
