import { db } from '../../firebase/firebase-config';
import { collection, onSnapshot } from 'firebase/firestore';
import RecipesList from '../../components/RecipesList';
import SearchBar from '../search/SearchBar';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function Home() {
  const [recipes, setRecipes] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    let ref = collection(db, 'recipes');
    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        if (snapshot.empty) {
          setError('No recipes to shows');
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
    console.log('user', user);
    return () => unsub();
  }, []);

  return (
    <div>
      {user && <h4>Hello, {user.displayName}</h4>}
      {/* add style */}
      <SearchBar />
      {error && <p>{error}</p>}
      {isPending && <p>Loading...</p>}
      {recipes && <RecipesList recipes={recipes} />}
    </div>
  );
}
