import { Link, useLocation } from 'react-router-dom';
import css from '../MovieList/MovieList.module.css';
import StarRating from '../StarRating/StarRating';
import ScrollToTop from 'react-scroll-up';

export default function MovieList({ films }) {
  const location = useLocation();

  return (
    <div>
      <ScrollToTop
        showUnder={100}
        style={{
          backgroundColor: '#2a2724ca',
          color: '#ffffff',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          lineHeight: '40px',
          textAlign: 'center',
          margin: '0px',
          bottom: '14px',
          right: '14px',
        }}
      >
        <span>UP</span>
      </ScrollToTop>
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
