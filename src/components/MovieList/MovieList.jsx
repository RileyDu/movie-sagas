import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './MovieList.css';
import MovieListItem from '../MovieListItem/MovieListItem';

function MovieList() {

  const dispatch = useDispatch();
  const movies = useSelector(store => store.movies);


  return (
    <main>
      <h1>MovieList</h1>
      {/* <p>{JSON.stringify(movies)}</p> */}
      <section className="movies">
        
        {movies.map(movie => 
          <MovieListItem movie={ movie } />
        )}
      </section>
    </main>
  );
}

export default MovieList;


// favoriteList.map(gif => (
//   <FavListItem gif={ gif }/>
// ))}</ul>