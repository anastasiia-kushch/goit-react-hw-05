import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../api';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await getMovieReviews(movieId);
      setReviews(response);
    };
    fetchReviews();
  }, [movieId]);

  return (
    <ul>
      {reviews !== null &&
        reviews.map((review) => {
          return <li key={review.id}>
            <b>Author: {review.author}</b>
            <p>'{review.content}'</p>
          </li>}
        )}
        {reviews == null && <b>We don't have any reviews for this movie</b>} 
    </ul>
  );
}
 

//the king