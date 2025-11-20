import express from "express";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";

import {
  getBalcarPoints,
  getFurnasPoints,
  getSimaPoints
} from '../controllers/mapController';
import { getCampanhaBalcar } from "../controllers/balcar/campanha.controller";
import { getFluxoinpe } from "../controllers/balcar/fluxoinpe.controller";
import { getInstituicaoBalcar } from "../controllers/balcar/instituicao.controller";
import { getReservatorioBalcar } from "../controllers/balcar/reservatorio.controller";
import { getSitioBalcar } from "../controllers/balcar/sitio.controller";
import { getTabelaCampo } from "../controllers/balcar/tabelacampo.controller";
import { getAbioticoColuna } from "../controllers/furnas/abioticocoluna.controller";

const router = express.Router();

router.get("/teste", (req, res) => {
  console.log("ROTA DE TESTE ACESSADA COM SUCESSO!"); // Mensagem para o terminal
  res.status(200).json({ message: "A rota de teste funcionou!" });
});


router.get('/api/mapa/balcar', getBalcarPoints);
router.get('/api/mapa/furnas', getFurnasPoints);
router.get('/api/mapa/sima', getSimaPoints);

/* 
//Get do Balcar
router.get('/balcar/campanha', getCampanhaBalcar);
router.get('/balcar/fluxoinpe', getFluxoinpe);
router.get('/balcar/instituicao', getInstituicaoBalcar);
router.get('/balcar/reservatorio', getReservatorioBalcar);
router.get('/balcar/sitio', getSitioBalcar);
router.get('/balcar/tabelacampo', getTabelaCampo);
*/

router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.use("/sima", sima);


export default router;
