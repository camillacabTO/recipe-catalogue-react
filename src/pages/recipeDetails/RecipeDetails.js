import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.scss';
import { db } from '../../firebase/firebase-config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  // Update recipe func example
  // const handleClick = async () => {
  //   const recipeDoc = doc(db, 'recipes', id);
  //   const newFields = { instructions: 'test' };
  //   await updateDoc(recipeDoc, newFields);
  // };

  useEffect(() => {
    const docRef = doc(db, 'recipes', id);

    const unsub = onSnapshot(
      docRef,
      (doc) => {
        if (doc.exists) {
          setRecipe(doc.data());
          setIsPending(false);
        } else {
          setError('Recipe not found');
          setIsPending(false);
        }
      },
      (err) => {
        setError(err.message);
        setIsPending(false);
      }
    );

    // getDoc(docRef)
    //   .then((docSnapshot) => {
    //     if (docSnapshot.exists) {
    //       setRecipe(docSnapshot.data());
    //       setIsPending(false);
    //     } else {
    //       setError('Recipe not found');
    //       setIsPending(false);
    //     }
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //     setIsPending(false);
    //   });
    return () => unsub();
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
