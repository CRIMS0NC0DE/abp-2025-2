import MapaInterativo from "../../components/MapaInterativoSIMA";
import TableView from "../TableView/TableViewSIMA";

export default function ConsultaSIMA (){

    return (
        <>
        <TableView/>
        <MapaInterativo source={"furnas"}/>
        </>
    )
}