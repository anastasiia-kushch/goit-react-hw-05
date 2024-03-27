import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import css from '../MovieReviews/MovieReviews.module.css'

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setError(false);
        setLoading(true);

        const response = await getMovieReviews(movieId);
        setReviews(response);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      <ul className={css.list}>
        {reviews !== null &&
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3 className={css.title}>Author: {review.author}</h3>
                <p className={css.text}>'{review.content}'</p>
              </li>
            );
          })}
        {reviews.length === 0 && <p>We don't have any reviews for this movie.</p>}
      </ul>
    </div>
  );
}

