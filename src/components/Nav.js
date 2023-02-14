import { Link } from 'react-router-dom';
import styles from './Nav.module.scss';

export default function Nav() {
  return (
    <div className={styles.navbar}>
      <nav>
        <Link to='/'>Recipe Catalog</Link>
        <div className={styles.links}>
          <Link to='/add-recipe'>Add New Recipe</Link>
        </div>
      </nav>
    </div>
  );
}
