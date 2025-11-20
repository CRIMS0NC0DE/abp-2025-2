import express from "express";
import reservatorio from "./reservatorio.routes";
import instituicao from "./instituicao.routes";
import tabelacampo from "./tabelacampo.routes";
import campanha from "./campanha.routes";
import fluxoinpe from "./fluxoinpe.routes";
import sitio from "./sitio.routes";
import { getCampanhaBalcar } from "../../controllers/balcar/campanha.controller";
import { getFluxoinpe } from "../../controllers/balcar/fluxoinpe.controller";
import { getInstituicaoBalcar } from "../../controllers/balcar/instituicao.controller";
import { getReservatorioBalcar } from "../../controllers/balcar/reservatorio.controller";
import { getSitioBalcar } from "../../controllers/balcar/sitio.controller";
import { getTabelaCampo } from "../../controllers/balcar/tabelacampo.controller";

const router = express.Router();

//Get do Balcar
router.get('/campanha', getCampanhaBalcar);
router.get('/fluxoinpe', getFluxoinpe);
router.get('/instituicao', getInstituicaoBalcar);
router.get('/reservatorio', getReservatorioBalcar);
router.get('/sitio', getSitioBalcar);
router.get('/tabelacampo', getTabelaCampo);

router.use("/reservatorio", reservatorio);
router.use("/instituicao", instituicao);
router.use("/tabelacampo", tabelacampo);
router.use("/campanha", campanha);
router.use("/fluxoinpe", fluxoinpe);
router.use("/sitio", sitio);

export default router;
