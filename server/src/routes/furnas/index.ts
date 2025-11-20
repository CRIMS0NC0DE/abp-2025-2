import express from "express";
import abioticocoluna from "./abioticocoluna.routes";
import campanha from "./campanha.routes";
import campanhaportabela from "./campanhaportabela.routes";
import instituicao from "./instituicao.routes";
import reservatorio from "./reservatorio.routes";
import sitio from "./sitio.routes";
import bolha from "./bolhas.routes";
import bioticocoluna from "./bioticocoluna.routes";
import dadosrepresa from "./dadosrepresa.routes";
import carbono from "./carbono.routes";
import bioticosuperficie from "./bioticosuperficie.routes";
import abioticosuperficie from "./abioticosuperficie.routes";
import dupladessorcaoagua from "./dupladessorcaoagua.routes";
import dadostimeseries from "./dadostimeseries.routes";
import { getAbioticoColuna } from "../../controllers/furnas/abioticocoluna.controller";
import { getCampanhaFurnas } from "../../controllers/furnas/campanha.controller";
import { getCampanhaporTabela } from "../../controllers/furnas/campanhaportabela.controller";
import { getInstituicaoFurnas } from "../../controllers/furnas/instituicao.controller";
import { getReservatorioFurnas } from "../../controllers/furnas/reservatorio.controller";
import { getSitioFurnas } from "../../controllers/furnas/sitio.controller";
import { getBolhas } from "../../controllers/furnas/bolhas.controller";
import { getBioticoColuna } from "../../controllers/furnas/bioticocoluna.controller";
import { getDadosRepresa } from "../../controllers/furnas/dadosrepresa.controller";
import { getCarbono } from "../../controllers/furnas/carbono.controller";
import { getBioticoSuperficie } from "../../controllers/furnas/bioticosuperficie.controller";
import { getAbioticoSuperficie } from "../../controllers/furnas/abioticosuperficie.controller";
import { getDadosTimeSeries } from "../../controllers/furnas/dadostimeseries.controller";
import { getDuplaDessorcaoAgua } from "../../controllers/furnas/dupladessorcaoagua.controller";

const router = express.Router();


router.get("/abioticocoluna", getAbioticoColuna); //erro
router.get("/campanha", getCampanhaFurnas);
router.get("/campanhaportabela", getCampanhaporTabela); //erro
router.get("/instituicao", getInstituicaoFurnas); //erro
router.get("/reservatorio", getReservatorioFurnas);
router.get("/sitio", getSitioFurnas);
router.get("/bolhas", getBolhas);
router.get("/bioticocoluna", getBioticoColuna);
router.get("/dadosrepresa", getDadosRepresa);
router.get("/carbono", getCarbono);
router.get("/bioticosuperficie", getBioticoSuperficie);
router.get("/abioticosuperficie", getAbioticoSuperficie);
router.get("/dupladessorcaoagua", getDuplaDessorcaoAgua); //erro
router.get("/dadostimeseries", getDadosTimeSeries); //erro

router.use("/abioticocoluna", abioticocoluna);
router.use("/campanha", campanha);
router.use("/campanhaportabela", campanhaportabela);
router.use("/instituicao", instituicao);
router.use("/reservatorio", reservatorio);
router.use("/sitio", sitio);
router.use("/bolhas", bolha);
router.use("/bioticocoluna", bioticocoluna);
router.use("/dadosrepresa", dadosrepresa);
router.use("/carbono", carbono);
router.use("/bioticosuperficie", bioticosuperficie);
router.use("/abioticosuperficie", abioticosuperficie);
router.use("/dupladessorcaoagua", dupladessorcaoagua);
router.use("/dadostimeseries", dadostimeseries);

export default router;
