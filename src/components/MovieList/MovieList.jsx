import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./MovieList.css";
import MovieListItem from "../MovieListItem/MovieListItem";
import { useHistory } from "react-router-dom";
import { Button, Row, Col } from "react-bootstrap";

function MovieList() {
  const history = useHistory();
  const dispatch = useDispatch();
  const movies = useSelector((store) => store.movies);

  return (
    <main>
      <Button onClick={() => history.push(`/addMovie`)}>ADD NEW MOVIE</Button>
      <hr />
      <div className="container">
        <section className="movies">
          <Row xs={1} md={4} className="g-4">
            {movies.map((movie) => (
              <Col key={movie.id}>
                <MovieListItem movie={movie} />
              </Col>
            ))}
          </Row>
        </section>
      </div>
    </main>
  );
}

export default MovieList;
