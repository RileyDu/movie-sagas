import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put, take } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
  yield takeEvery('FETCH_MOVIES', fetchAllMovies)
  yield takeEvery('FETCH_DETAILS', fetchDetails);
  yield takeEvery('POST_MOVIE', postMovie);
  yield takeEvery('FETCH_GENRES', fetchGenresSaga);
  yield takeEvery('EDIT_MOVIE', editMovieSaga)
  yield takeEvery('DELETE_MOVIE', deleteMovieSaga)
}


// SAGAS!! (generators?)

//UseEffect calls this function when page loads, GETs all movies from DB
function* fetchAllMovies() {
  try {
    // Get the movies:
    const moviesResponse = yield axios.get('/api/movies');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_MOVIES',
      payload: moviesResponse.data
    });
  } catch (error) {
    console.log('fetchAllMovies error:', error);
  }
}

//AddMovie page useEffect calls this to populate the drop down menue
function* fetchGenresSaga() {
  try {
    // Get the movies:
    const genresResponse = yield axios.get('/api/genres');
    // Set the value of the genres reducer:
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (error) {
    console.log('fetching genres error:', error);
  }
}

//Details page gets the specified movies data from db
function* fetchDetails(action) {
  try {
    // Get the movies details:
    const detailsResponse = yield axios.get(`/api/movies/${action.payload}`); // this is the id of the movie that was clicked
    // Set the value of the details reducer:
    yield put({
      type: 'SET_DETAILS',
      payload: detailsResponse.data[0]//its in an array of 1, can now access as an object
    });
  } catch (error) {
    console.log('fetchDetails error:', error);
  }
}

// Add movie form uses this generator to add a movie to db
function* postMovie(action) {
  try {
    // Post the form data of user submit to the db
    yield axios.post('/api/movies', action.payload); // giving the server the form data
    
    yield put({
      type: 'FETCH_MOVIES' // calling the fetch to rerender the new movie in the db
    });
  } catch (error) {
    console.error('postMovie error:', error);
  }
}

// Edit movie form uses this generator to change title and description
function* editMovieSaga(action) {
  try {
    // PUT the form data of user submit to the db
    yield axios.put(`/api/movies/${action.payload}`);
    
    yield put({
      type: 'FETCH_MOVIES' // calling the fetch to rerender the new movie data in the db
    });
  } catch (error) {
    console.error('editMovie error:', error);
  }
}

//MAKE SURE SQL TABLES ARE ADJUSTED FOR THIS TO FUNCTION PROPERLY
//Details page lets user delete movie
// Mostly implemnted to make this a full CRUD app
function* deleteMovieSaga(action) {
  try {
    yield axios.delete(`/api/movies/${action.payload}`); // tells the server to make DELETE request with movie id
    yield put({
      type: 'FETCH_MOVIES' // rerender the movie gallery without delete movie
    });
  } catch (error) {
    console.error('deleteMovie error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();


// REDUCERS
// Used to store details for the movie that user clicked on
const details = (state = {}, action) => {
  switch (action.type) {
    case 'SET_DETAILS':
      return action.payload;
    default:
      return state;
  }
}

// Used to store movies returned from the server
const movies = (state = [], action) => {
  switch (action.type) {
    case 'SET_MOVIES':
      return action.payload;
    default:
      return state;
  }
}

// Used to store the movie genres 
const genres = (state = [], action) => {
  switch (action.type) {
    case 'SET_GENRES':
      return action.payload;
    default:
      return state;
  }
}

// Create one store that all components can use
const storeInstance = createStore(
  combineReducers({
    movies,
    genres,
    details,
  }),
  // Add sagaMiddleware to our store
  applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

export default storeInstance;
