import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

export default function AddMovie() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDescription, setMovieDescription] = useState("");

  const handleInputChangeTitle = (e) => {
    setMovieTitle(e.target.value);
  };

  const handleInputChangePoster = (e) => {
    setMoviePoster(e.target.value);
  };

  const handleInputChangeDesc = (e) => {
    setMovieDescription(e.target.value);
  };

  const movieData = {
    title: movieTitle,
    poster: moviePoster,
    description: movieDescription,
    genre_id: 2,
  };

  function postMovie() {
    console.log("checking payload of submit", movieData);
    dispatch({
      type: "POST_MOVIE",
      payload: movieData,
    });
    setMovieTitle("");
    setMoviePoster("");
    setMovieDescription("");
  }

  return (
    <>
      <h1>IN ADD MOVIE </h1>
      <form action="">
        <div class="form-group">
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
            <input
              type="url"
              class="form-control"
              id="floatingInput"
              value={moviePoster}
              onChange={handleInputChangePoster}
            />
            <label for="floatingInput">Enter Movie Poster URL Here</label>
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
        <div class="form-group form-floating mb-3">

          <select class="form-select" id="exampleSelect1" r>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
          <label for="exampleSelect1" >
            Select Genre
          </label>
        </div>
      </form>
      <Button onClick={() => history.push(`/`)}>GO BACK</Button>
      <Button
        onClick={() => {
          history.push(`/`);
          postMovie();
        }}
      >
        ADD MOVIE
      </Button>
    </>
  );
}
