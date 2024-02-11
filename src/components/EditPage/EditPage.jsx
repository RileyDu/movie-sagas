import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function EditPage() {
  const history = useHistory();
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
const dispatch = useDispatch();

  useEffect(() => {
    console.log("id:", id);
    dispatch({ type: "FETCH_DETAILS", payload: id });
  }, [id]);


  const handleInputChangeTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setMovieDescription(e.target.value);
  };

  function postMovieEdit() {

    const changedMovieData = {
        title: movieTitle,
        description: movieDescription,
        id: id
    }
    console.log("checking payload of submit", changedMovieData);

    if (!movieTitle || !movieDescription) {
      setShowAlert(true);
      return;
    }

    dispatch({
      type: "EDIT_MOVIE",
      payload: changedMovieData,
    });
    setMovieTitle("");
    setMovieDescription("");
    history.push(`/details/${id}`);
  }
  
  return (
    <>
      <h1>IN EDIT PAGE</h1>
      {showAlert && (
        <div className="alert alert-dismissible alert-danger">
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
          <strong>Oh snap!</strong> Change a few things up and try submitting
          again.
        </div>
      )}
      <form>
        <div class="form-group container">
          <div class="form-floating mb-3">
            <input
              type="text"
              class="form-control"
              id="floatingInput"
              value={movieTitle}
              onChange={handleInputChangeTitle}
            />
            <label for="floatingInput">Enter Movie Title Here</label>
          </div>
          <div class="form-floating mb-3">
            <textarea
              type="text"
              class="form-control"
              id="textArea"
              value={movieDescription}
              onChange={handleInputChangeDesc}
              rows="5"
            />
            <label for="textArea">Enter Movie Description</label>
          </div>
        </div>
        </form>


      {/* THIS IS ALL FOR SOME FANCY BUTTONS */}
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/details/:id`)}
        >
          CANCEL
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => postMovieEdit()}
        >
          SAVE
        </button>
      </div>
    </>
  );
}
