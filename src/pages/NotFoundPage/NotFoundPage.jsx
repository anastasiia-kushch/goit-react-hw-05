import { Link } from 'react-router-dom';
import css from '../NotFoundPage/NotFoundPage.module.css'

export default function NotFoundPage() {
  return (
    <div className={css.div}>
      <b>Oops! Not found...</b>
      <Link to="/" className={css.link}>Back to home page</Link>
    </div>
  );
}
