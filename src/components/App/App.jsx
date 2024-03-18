import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import css from '../App/App.module.css'

const HomePage = lazy(() => import("../../pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../../pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("../../pages/MovieDetailsPage/MovieDetailsPage"));
const MovieCast = lazy(() => import("../MovieCast/MovieCast"));
const MovieReviews = lazy(() => import("../MovieReviews/MovieReviews"));
const NotFoundPage = lazy(() => import("../../pages/NotFoundPage/NotFoundPage"));


function App() {
  return (
    <div className={css.body}>
      <Navigation />

      <Suspense fallback={<div>LOADING...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path='reviews' element={<MovieReviews/>}/>
          </Route>
          <Route path='*' element={<NotFoundPage/>} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
