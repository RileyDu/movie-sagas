import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Details() {
  const params = useParams();
  const details = useSelector((store) => store.details);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("params.id:", params.id);
    dispatch({ type: "FETCH_DETAILS", payload: params.id });
  }, [params.id]);

//   console.log("details content", details);

  if (params.id === undefined) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>IN DETAILS PAGE</h1>
      <ul>
        <li>{details.title}</li>
        <li>{details.description}</li>
        <li>{details.poster}</li>
        <li>{details.genre}</li>
      </ul>
      <button onClick={() => history.push(`/`)}>BACK TO HOME</button>
    </>
  );
}
