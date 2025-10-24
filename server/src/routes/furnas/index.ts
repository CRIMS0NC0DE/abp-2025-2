import express from "express";

// Importações principais
import campanha from "./campanha.routes";
import abioticocoluna from "./abioticocoluna.routes";

// Importações das outras tabelas
import abioticosuperficie from "./abioticosuperficie.routes";
import aguamateriaorganicasedimento from "./aguamateriaorganicasedimento.routes";
import bioticocoluna from "./bioticocoluna.routes";
import bioticosuperficie from "./bioticosuperficie.routes";
import bolhas from "./bolhas.routes";
import camarasolo from "./camarasolo.routes";
import carbono from "./carbono.routes";
import concentracaogasagua from "./concentracaogasagua.routes";
import concentracaogassedimento from "./concentracaogassedimento.routes";
import dadosprecipitacao from "./dadosprecipitacao.routes";
import dadosrepresa from "./dadosrepresa.routes";
import difusao from "./difusao.routes";
import dupladessorcaoagua from "./dupladessorcaoagua.routes";
import fluxobolhasinpe from "./fluxobolhasinpe.routes";
import fluxocarbono from "./fluxocarbono.routes";
import fluxodifusivo from "./fluxodifusivo.routes";
import fluxodifusivoinpe from "./fluxodifusivoinpe.routes";
import gasesembolhas from "./gasesembolhas.routes";
import horiba from "./horiba.routes";
import ionsnaaguaintersticialdosedimento from "./ionsnaaguaintersticialdosedimento.routes";
import medidacampocoluna from "./medidacampocoluna.routes";
import medidacamposuperficie from "./medidacamposuperficie.routes";
import nutrientessedimento from "./nutrientessedimento.routes";
import parametrosbiologicosfisicosagua from "./parametrosbiologicosfisicosagua.routes";
import pfq from "./pfq.routes";
import tc from "./tc.routes";
import variaveisfisicasquimicasdaagua from "./variaveisfisicasquimicasdaagua.routes";

const router = express.Router();

// Rotas principais
router.use("/campanha", campanha);
router.use("/abioticocoluna", abioticocoluna);

// Registro das outras rotas
router.use("/abioticosuperficie", abioticosuperficie);
router.use("/aguamateriaorganicasedimento", aguamateriaorganicasedimento);
router.use("/bioticocoluna", bioticocoluna);
router.use("/bioticosuperficie", bioticosuperficie);
router.use("/bolhas", bolhas);
router.use("/camarasolo", camarasolo);
router.use("/carbono", carbono);
router.use("/concentracaogasagua", concentracaogasagua);
router.use("/concentracaogassedimento", concentracaogassedimento);
router.use("/dadosprecipitacao", dadosprecipitacao);
router.use("/dadosrepresa", dadosrepresa);
router.use("/difusao", difusao);
router.use("/dupladessorcaoagua", dupladessorcaoagua);
router.use("/fluxobolhasinpe", fluxobolhasinpe);
router.use("/fluxocarbono", fluxocarbono);
router.use("/fluxodifusivo", fluxodifusivo);
router.use("/fluxodifusivoinpe", fluxodifusivoinpe);
router.use("/gasesembolhas", gasesembolhas);
router.use("/horiba", horiba);
router.use("/ionsnaaguaintersticialdosedimento", ionsnaaguaintersticialdosedimento);
router.use("/medidacampocoluna", medidacampocoluna);
router.use("/medidacamposuperficie", medidacamposuperficie);
router.use("/nutrientessedimento", nutrientessedimento);
router.use("/parametrosbiologicosfisicosagua", parametrosbiologicosfisicosagua);
router.use("/pfq", pfq);
router.use("/tc", tc);
router.use("/variaveisfisicasquimicasdaagua", variaveisfisicasquimicasdaagua);

export default router;