import MapaInterativoFurnas from "../../components/MapaInterativoFurnas";
import TableView from "../TableView/TableView";

export default function ConsultaSIMA (){

    return (
        <>
        <TableView/>
        <MapaInterativoFurnas source={"furnas"}/>
        </>
    )
}