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

function* postMovie(action) {
  try {
    // Get the movies:
    yield axios.post('/api/movies', action.payload);
    // // Set the value of the movies reducer:
    yield put({
      type: 'FETCH_MOVIES'
    });
  } catch (error) {
    console.error('postMovie error:', error);
  }
}

function* editMovieSaga(action) {
  try {
    // Get the movies:
    yield axios.put(`/api/movies/${action.payload}`);
    // // Set the value of the movies reducer:
    yield put({
      type: 'FETCH_MOVIES'
    });
  } catch (error) {
    console.error('editMovie error:', error);
  }
}

function* deleteMovieSaga(action) {
  try {
    yield axios.delete(`/api/movies/${action.payload}`);
    yield put({
      type: 'FETCH_MOVIES'
    });
  } catch (error) {
    console.error('deleteMovie error:', error);
  }
}

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

function* fetchGenresSaga() {
  try {
    // Get the movies:
    const genresResponse = yield axios.get('/api/genres');
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_GENRES',
      payload: genresResponse.data
    });
  } catch (error) {
    console.log('fetching genres error:', error);
  }
}

function* fetchDetails(action) {
  try {
    // Get the movies:
    const detailsResponse = yield axios.get(`/api/movies/${action.payload}`);
    // Set the value of the movies reducer:
    yield put({
      type: 'SET_DETAILS',
      payload: detailsResponse.data[0]
    });
  } catch (error) {
    console.log('fetchDetails error:', error);
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

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

// Used to store the movie genres STRETCH GOAL
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
