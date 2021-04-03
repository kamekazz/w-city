import Link from 'next/link';
import { useDispatch } from 'react-redux';
import classes from './main-navigation.module.css';

function MainNavigation() {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <header className={classes.header}>
      <Link href="/">
        <a>
          <div className={classes.logo}>Next Auth</div>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/auth">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <button onClick={logout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
