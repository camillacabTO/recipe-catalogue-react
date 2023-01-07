import { db } from '../../firebase/firebase-config';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import RecipesList from '../../components/RecipesList';
import SearchBar from '../search/SearchBar';
import { useEffect, useState } from 'react';
import AuthBar from '../../components/AuthBar';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const ref = collection(db, 'recipes');
    const q = query(ref, where('user', '==', user.uid));

    const unsub = onSnapshot(
      q,
      (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to show');
          setIsPending(false);
          setRecipes(null);
        } else {
          let result = [];
          snapshot.docs.forEach((doc) => {
            result.push({ ...doc.data(), id: doc.id });
          });
          setRecipes(result);
          setIsPending(false);
        }
      },
      (error) => {
        setError(error.message);
        setIsPending(false);
      }
    );
    // getDocs(collection(db, 'recipes')).then((recipesSnapshot) => {
    //   if (recipesSnapshot.empty) {
    //     setError('No recipes to shows');
    //     setIsPending(false);
    //   } else {
    //     let result = [];
    //     recipesSnapshot.docs.forEach((doc) => {
    //       result.push({ ...doc.data(), id: doc.id });
    //     });
    //     setRecipes(result);
    //     setIsPending(false);
    //   }
    // });
    // console.log('user', user);
    return () => unsub();
  }, [user.uid]);

  return (
    <div>
      <AuthBar />
      <SearchBar />
      {error && <p style={{ marginTop: '2rem' }}>{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipes && <RecipesList recipes={recipes} />}
    </div>
  );
}
