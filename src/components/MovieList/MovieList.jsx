import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';
import StarRating from '../StarRating/StarRating';

export default function MovieList({ films }) {
  const location = useLocation();
  const src = films.map((film) => film.backdrop_path);

  return (
    <div>
      <ul className={css.ul}>
        {films.map((film) => {
          return (
            <li key={film.id} className={css.li}>
              <Link
                to={`/movies/${film.id}`}
                state={location}
                className={css.link}
              >
                {
                  <img
                    src={`https://image.tmdb.org/t/p/w500${
                      film.backdrop_path || film.poster_path
                    }`}
                    alt={film.title}
                    className={css.img}
                  />
                }

                {film.title}
                {<StarRating rating={film.vote_average} />}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
