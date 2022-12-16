import styles from './Home.module.scss';
import { useFetch } from '../../hooks/useFetch';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import RecipesList from '../../components/RecipesList';
import SearchBar from '../search/SearchBar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDocs(collection(db, 'recipes'))
      .then((recipesSnapshot) => {
        if (recipesSnapshot.empty) {
          setError('No recipes to shows');
          setIsPending(false);
        } else {
          let result = [];
          recipesSnapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });
          setRecipes(result);
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, []);

  return (
    <div className={styles.home}>
      <SearchBar />
      {error && <p className={error}>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {recipes && <RecipesList recipes={recipes} />}
    </div>
  );
}
