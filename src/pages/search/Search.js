import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/RecipesList';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useEffect, useState } from 'react';

export default function Search() {
  const [searchParams] = useSearchParams();
  const userQuery = searchParams.get('query');
  const [foundRecipes, setFoundRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  //substring query
  const q = query(
    collection(db, 'recipes'),
    where('title', '>=', userQuery),
    where('title', '<=', userQuery + '\uf8ff')
  );

  useEffect(() => {
    getDocs(q).then((querySnapshot) => {
      if (querySnapshot.empty) {
        setError('No recipes to shows');
        setIsPending(false);
        setFoundRecipes(null);
      } else {
        let result = [];
        querySnapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
        setFoundRecipes(result);
        setIsPending(false);
      }
    });
  }, [q]);

  return (
    <div>
      <h2>Your search results:</h2>
      {error && <p className={error}>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {foundRecipes && <RecipesList recipes={foundRecipes} />}
    </div>
  );
}
