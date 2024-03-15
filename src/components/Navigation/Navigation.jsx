import { NavLink } from 'react-router-dom';
import css from '../Navigation/Navigation.module.css'

export default function Navigation() {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/movies">Movies</NavLink>
      </nav>
    </div>
  );
}
