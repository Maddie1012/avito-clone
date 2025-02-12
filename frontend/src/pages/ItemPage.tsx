import { useParams } from "react-router-dom";

export default function ItemPage() {
    const {id} = useParams();
    return <h1>Объявление #{id}</h1>
}