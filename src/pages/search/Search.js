import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/RecipesList';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Search() {
  const [searchParams] = useSearchParams();
  const userQuery = searchParams.get('query');
  const [foundRecipes, setFoundRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  const q = query(
    collection(db, 'recipes'),
    where('user', '==', user.uid),
    where('ingredients', 'array-contains-any', userQuery.split(' '))
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
      {error && <p className='error'>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {foundRecipes && <RecipesList recipes={foundRecipes} />}
    </div>
  );
}
