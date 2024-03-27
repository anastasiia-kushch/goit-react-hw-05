import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import css from '../HomePage/HomePage.module.css'
import ScrollToTop from 'react-scroll-up';

export default function HomePage() {
  const [trending, setTrending] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getTrendingMovies();
        setTrending(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, []);

  return (
    <div>
      <h2 className={css.h2}>Trending today</h2>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <MovieList films={trending} />
    </div>
  );
}
