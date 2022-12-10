import styles from './Home.module.scss';
import { useFetch } from '../../hooks/useFetch';
import RecipesList from '../../components/RecipesList';
import SearchBar from '../search/SearchBar';

export default function Home() {
  const {
    error,
    isPending,
    data: recipes,
  } = useFetch('http://localhost:3000/recipes');

  return (
    <div className={styles.home}>
      <SearchBar />
      {error && <p className={error}>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {recipes && <RecipesList recipes={recipes} />}
    </div>
  );
}
