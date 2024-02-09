export default function MovieListItem ({ movie }){
console.log('a single movie', movie);


    return (
        <div data-testid='movieItem' key={movie.id} >
          <h3>{movie.title}</h3>
          <img src={movie.poster} alt={movie.title}/>
        </div>
      );
}