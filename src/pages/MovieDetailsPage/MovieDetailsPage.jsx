import { useEffect, useState, useRef, Suspense } from 'react';
import {
  useLocation,
  useParams,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { getMovieById } from '../../api';
import css from '../MovieDetailsPage/MovieDetailsPage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { GoArrowLeft, GoArrowUp } from 'react-icons/go';
import StarRating from '../../components/StarRating/StarRating';
import ScrollToTop from 'react-scroll-up';

export default function MovieDetailsPage() {
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState('');
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setError(false);
        setLoading(true);
        const response = await getMovieById(movieId);
        setDetails(response);

        const img = `https://image.tmdb.org/t/p/w500${response.backdrop_path}`;
        setImage(img);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  let genres = null;
  if (details.genres) {
    genres = details.genres.map((genre) => {
      return <span key={genre.id}>{genre.name}</span>;
    });
  }

  return (
    <div className={css.div}>
      <Link to={goBackRef.current} className={css.link}>
        <GoArrowLeft />
        Go back
      </Link>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <div className={css.divInfo}>
        <img src={image} alt={details.title} className={css.img} />
        <div className={css.divText}>
          <div className={css.text}>
            <h1>
              {details.title} (
              {details.release_date && details.release_date.slice(0, 4)})
            </h1>
            <p>User Score: {<StarRating rating={details.vote_average} />}</p>
          </div>

          <div className={css.text}>
            <h2>Overview</h2>
            <p>{details.overview}</p>
          </div>

          <div className={css.text}>
            <h3>Genres</h3>
            <p className={css.span}>{genres}</p>
          </div>
        </div>
      </div>
      <hr />
      <div className={css.addInfo}>
        <h3 className={css.h3}>Additional info</h3>

        <div className={css.text}>
          <NavLink to="cast" className={css.navLink}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={css.navLink}>
            Reviews
          </NavLink>
        </div>
      </div>

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

      <hr />

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
