import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.scss';
import { db } from '../../firebase/firebase-config';
import { getDoc, doc } from 'firebase/firestore';
import { useFetch } from '../../hooks/useFetch';
import { useState, useEffect } from 'react';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const docRef = doc(db, 'recipes', id);

    getDoc(docRef)
      .then((docSnapshot) => {
        if (docSnapshot.exists) {
          setRecipe(docSnapshot.data());
          setIsPending(false);
        } else {
          setError('Recipe not found');
          setIsPending(false);
        }
      })
      .catch((err) => {
        setError(err.message);
        setIsPending(false);
      });
  }, [id]);

  return (
    <div className={styles.recipe}>
      {error && <p className={error}>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {recipe && (
        <>
          <h1>{recipe.title}</h1>
          <ul>
            {recipe.ingredients.map((ingredient) => (
              <li>{ingredient}</li>
            ))}
          </ul>
          <p>Preparation Time: {recipe.cookingTime}</p>
          <p>{recipe.instructions}</p>
        </>
      )}
    </div>
  );
}
