import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function MovieListItem ({ movie }){
const history = useHistory()
    return (
        <div data-testid='movieItem' key={movie.id} onClick={() => history.push(`/details/${movie.id}`)}>
          <h3>{movie.title}</h3>
          <img src={movie.poster} alt={movie.title} data-testid="toDetails"/>
        </div>
      );
}