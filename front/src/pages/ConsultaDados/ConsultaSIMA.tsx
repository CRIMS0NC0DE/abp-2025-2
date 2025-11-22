import MapaInterativo from "../../components/MapaInterativoSIMA";
import TableView from "../TableView/TableViewSIMA";
import { GraficoSIMA } from "../../components/Graficos/GraficoSIMA";

export default function ConsultaSIMA (){

    return (
        <>
        <TableView/>
        <MapaInterativo source={"furnas"}/>
        <GraficoSIMA/>
        </>
    )
}