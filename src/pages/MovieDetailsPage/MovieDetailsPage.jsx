import { useEffect, useState, useRef } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { getMovieById } from '../../api';

export default function MovieDetailsPage() {
  const [details, setDetails] = useState([]);
  const [image, setImage] = useState('');

  const { movieId } = useParams();
  const location = useLocation();
  const goBackRef = useRef(location.state ?? '/movies')
  console.log(goBackRef);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await getMovieById(movieId);
        setDetails(response);

        const img = `https://image.tmdb.org/t/p/w500${response.backdrop_path}`;
        setImage(img);
      } catch (error) {
        console.log(error);
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
    <div>
        <Link to={goBackRef.current}>Go back</Link>
      <img src={image} alt={details.title} />
      <h1>{details.title}</h1>
      <p>User Score: {details.vote_count}</p>
      <h2>Overview</h2>
      <p>{details.overview}</p>
      <h3>Genres</h3>
      <p>{genres}</p>
    </div>
  );
}
