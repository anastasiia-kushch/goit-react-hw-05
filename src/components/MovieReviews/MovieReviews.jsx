import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
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
      <ul>
        {reviews !== null &&
          reviews.map((review) => {
            return (
              <li key={review.id}>
                <b>Author: {review.author}</b>
                <p>'{review.content}'</p>
              </li>
            );
          })}
        {reviews == null && <b>We don't have any reviews for this movie</b>}
      </ul>
    </div>
  );
}

//the king
