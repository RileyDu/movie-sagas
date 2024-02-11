import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";
import MovieListItem from "../MovieListItem/MovieListItem";
import "./MovieList.css";

function MovieList() {
  const movies = useSelector((store) => store.movies);
  const history = useHistory();

  return (
    <main>
      <Button onClick={() => history.push(`/addMovie`)}>ADD NEW MOVIE</Button>
      {/* takes user to form to submit a new movie to db */}
      <hr />
      <div className="container-gallery">
        <section className="movies">
          <Row xs={1} sm={3} md={4} className="g-4">
            {/* responsive bootstrap grid to adjust columns on width */}
            {movies.map((movie) => (
              <Col key={movie.id}>
                <MovieListItem movie={movie} />
              </Col>
              // maps thru the movies array from the store
              // list item was used to allow componetitization 
            ))}
          </Row>
        </section>
      </div>
    </main>
  );
}

export default MovieList;
