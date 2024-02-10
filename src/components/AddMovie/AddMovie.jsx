import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function AddMovie(){
    const history = useHistory();
    const dispatch = useDispatch();
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
        genre_id: 2
    }

    function postMovie() {
        console.log('checking payload of submit', movieData);
        dispatch({
            type: 'POST_MOVIE',
            payload: movieData
        })
        setMovieTitle('')
        setMoviePoster('')
        setMovieDescription('')
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