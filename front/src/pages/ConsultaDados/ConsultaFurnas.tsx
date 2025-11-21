import MapaInterativoFurnas from "../../components/MapaInterativoFurnas";
import TableViewFurnas from "../TableView/TableViewFurnas";

export default function ConsultaSIMA (){

    return (
        <>
        <TableViewFurnas/>
        <MapaInterativoFurnas source={"furnas"}/>
        </>
    )
}