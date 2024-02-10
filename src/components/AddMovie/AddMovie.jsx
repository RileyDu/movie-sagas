import { useHistory } from "react-router-dom";


export default function AddMovie(){
    const history = useHistory();
    return (
        <>
        <h1>IN ADD MOVIE </h1>
        <button  onClick={() => history.push(`/`)}>GO BACK</button>
        <button  onClick={() => history.push(`/`)}>ADD MOVIE</button> 
        </>
    )
}