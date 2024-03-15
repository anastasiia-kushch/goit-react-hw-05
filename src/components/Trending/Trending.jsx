import { Link, useLocation } from 'react-router-dom';

export default function Trending({ films }) {
  const location = useLocation();

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {films.map((film) => {
          return (
            <li key={film.id}>
              <Link to={`/movies/${film.id}`} state={location}>{film.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
