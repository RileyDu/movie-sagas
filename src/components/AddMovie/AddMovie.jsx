import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";


export default function AddMovie(){
    const history = useHistory();
    const [movieTitle, setMovieTitle] = useState('')
    const [moviePoster, setMoviePoster] = useState('')
    const [movieDescription, setMovieDescription] = useState('')

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
    }

    function postMovie(url) {
        dispatch({
            type: 'POST_MOVIE',
            payload: movieData
        })
    }

    return (
        <>
        <h1>IN ADD MOVIE </h1>
        <form action="">
            <input type="text" name="" placeholder="Movie Title" id="" value={movieTitle} onChange={handleInputChangeTitle}/>
            <input type="text" name="" placeholder="Movie Poster URL" id="" value={moviePoster} onChange={handleInputChangePoster}/>
            <input type="text" name="" placeholder="Movie Description" id="" value={movieDescription} onChange={handleInputChangeDesc}/>
            <input type="text" name="" placeholder="DROPDOWN PLACEHOLDER" id="" />
            {/* use genre reducer for dropdown */}
        </form>
        <button  onClick={() => history.push(`/`)}>GO BACK</button>
        <button  onClick={() => {history.push(`/`); postMovie();}}>ADD MOVIE</button> 
        </>
    )
}