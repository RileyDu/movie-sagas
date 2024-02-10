import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";

export default function AddMovie() {
  const history = useHistory();
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);

  const [movieTitle, setMovieTitle] = useState("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [movieGenre, setMovieGenre] = useState({ id: "", name: "" });

//   console.log("what is a genre?", genres);

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
    genre_id: movieGenre.id,
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
    setMovieGenre({
        id:'',
        name: ''
    })
  }

  useEffect(() => {
    dispatch({ type: "FETCH_GENRES" });
  }, []);

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
        {genres && genres.length > 0 ? (
          <select
            class="form-select"
            id="genreSelect"
            value={movieGenre.id}
            onChange={(e) => {
                const selectedGenre = e.target.value;
                console.log('Selected Genre from user:', selectedGenre);
            //   const THEGenre = genres.find(
            //     (genre) => genre.id === selectedGenre
            //   );
            //   console.log("What is in the genre", THEGenre);
              setMovieGenre({id: selectedGenre});
            }}
          >
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
        ) : (
            <p>Loading genres...</p>
        )}
          <label for="genreSelect">Select Genre</label>
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
