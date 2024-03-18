import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';

export default function MovieList({ films }) {
  const location = useLocation();

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
                    src={`https://image.tmdb.org/t/p/w500${film.backdrop_path}`}
                    alt={film.title}
                    className={css.img}
                  />
                }
                {film.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
