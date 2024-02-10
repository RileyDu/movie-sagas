import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function MovieListItem({ movie }) {
  const history = useHistory();
  return (
<>
<div 
class="card bg-dark text-white"       
key={movie.id}
onClick={() => history.push(`/details/${movie.id}`)}
data-testid="movieItem">
  <img src={movie.poster} class="card-img" alt={movie.title} />
  {/* <div class="card-img-overlay">
    <h5 class="card-title">{movie.title}</h5> */}
    {/* <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
    <p class="card-text">Last updated 3 mins ago</p> */}
  </div>
{/* </div> */}
</>
  );
}
