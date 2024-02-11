import { Route, HashRouter as Router } from 'react-router-dom';
import MovieList from '../MovieList/MovieList';
import './App.css';
import Details from '../Details/Details';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import AddMovie from '../AddMovie/AddMovie';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_MOVIES' });
  }, []);

  return (
    <>
    <div className="App">
      <h1>The Movies Saga!</h1>
      <hr/>
      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        <Route path="/addMovie">
          <AddMovie />
        </Route>
        <Route path="/details/:id">
        <Details />
        </Route>
        
        {/* Add Movie page */}
      </Router>
    </div>
    </>
  );
}

export default App;


// Detail page Image Card
// Detail page delete button

// Code Comments
// Read Me
// Formatting