import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../api';
import css from '../MovieCast/MovieCast.module.css'

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await getMovieCast(movieId);
        setCast(response.cast);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieCast();
  }, [movieId]);

  console.log(cast);

  return (
    <div>
      <ul>
        {cast &&
          cast.map((actor) => {
            return (
              <li key={actor.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name} className={css.img}
                />
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
