import TableView from "../TableView/TableViewSIMA";
import { GraficoSIMA } from "../../components/Graficos/GraficoSIMA";
import MapaInterativoSIMA from "../../components/MapaInterativoSIMA";

export default function ConsultaSIMA (){

    return (
        <>
        <TableView/>
        <MapaInterativoSIMA source={"sima"}/>
        <GraficoSIMA/>
        </>
    )
}