import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../api';
import css from '../MovieCast/MovieCast.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieCast(movieId);
        setCast(response.cast);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul className={css.ul}>
        {cast &&
          cast.map((actor) => {
            return (
              <li key={actor.id} className={css.li}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  className={css.img}
                />
                <div className={css.text}>
                  <p>{actor.name}</p>
                  <p>Character: {actor.character}</p>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
