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

    console.log("details content", details);

  if (params.id === undefined) {
    return <h1>Loading...</h1>;
  }

  function deleteMovie(){
    dispatch({
      type: "DELETE_MOVIE",
      payload: params.id,
    });
    history.push(`/`);
  }

  return (
    <>
    <hr/>
      <div className="container-gallery">
        <div className="details-container">
          <div className="image-container">
            <img src={details.poster} alt={details.title} />
          </div>
          <div className="info-container">
            <h2>{details.title}</h2>
            <p>{details.description}</p>
            <p><strong>Genre:</strong> {details.genre}</p>
          </div>
        </div>
      </div>
      <hr/>
      {/* THIS IS ALL FOR SOME FANCY BUTTONS */}
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/`)}
        >
          HOME
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/edit/${params.id}`)}
        >
          EDIT
        </button>
        <button type="button" class="btn btn-secondary" onClick={() => deleteMovie()}>
          DELETE
        </button>
      </div>
    </>
  );
}
