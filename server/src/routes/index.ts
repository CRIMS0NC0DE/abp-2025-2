import express from "express";
import balcar from "./balcar";
import furnas from "./furnas";
import sima from "./sima";
import { getGeographicPoints } from '../controllers/mapController';

const router = express.Router();

router.get("/teste", (req, res) => {
  console.log("ROTA DE TESTE ACESSADA COM SUCESSO!"); // Mensagem para o terminal
  res.status(200).json({ message: "A rota de teste funcionou!" });
});



router.get('/api/pontos-geograficos', getGeographicPoints);
router.use("/balcar", balcar);
router.use("/furnas", furnas);
router.use("/sima", sima);


export default router;
