import { useHistory,useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export default function EditPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const [movieDescription, setMovieDescription] = useState(""); // local state that is populated with data from db
  const [movieTitle, setMovieTitle] = useState(""); // local state that is populated with data from db
  const [showAlert, setShowAlert] = useState(false); // alert will trigger if form inputs are empty
  const details = useSelector((store) => store.details); // talks to reducer to get details to populate inputs

  const handleInputChangeTitle = (e) => { // recording each change in form inputs in local state
    setMovieTitle(e.target.value);
  };

  const handleInputChangeDesc = (e) => { // recording each change in form inputs in local state
    setMovieDescription(e.target.value);
  };

  useEffect(() => { // when page loads set local state from the store
    setMovieTitle(details.title);
    setMovieDescription(details.description);
  }, [params.id]);

  //Save button triggers a post with local state through an object
  function postMovieEdit() {
    const changedMovieData = {
      title: movieTitle,
      description: movieDescription,
      id: params.id,
    };
    console.log("checking payload of submit", changedMovieData);

    //alert triggers if form values are undefined
    if (!movieTitle || !movieDescription) {
      setShowAlert(true);
      return;
    }

    dispatch({
      type: "EDIT_MOVIE", // talk to the sagas that we have a PUT request to the DB
      payload: changedMovieData,
    });
    setMovieTitle(""); // this is clearing the form on submit, might not be needed ?
    setMovieDescription(""); // this is clearing the form on submit, might not be needed ?
    history.push(`/details/${params.id}`); // takes user back to details page to see their changes right away
  }

  return (
    <>
    {/* THIS IS HIDDEN UNTIL USER TRIGGERS A BAD SUBMIT OF FORM */}
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
        {/* form uses local state to fill and record to assign to an object to PUT */}
      {/* THIS IS ALL FOR SOME FANCY BUTTONS */}
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/details/${params.id}`)}
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
