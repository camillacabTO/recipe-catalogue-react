import { useParams } from 'react-router-dom';
import styles from './RecipeDetails.module.scss';
import { useFetch } from '../../hooks/useFetch';

export default function RecipeDetails() {
  const { id } = useParams();
  const {
    error,
    loading,
    data: recipe,
  } = useFetch(`http://localhost:3000/recipes/${id}`);

  return (
    <div className={styles.recipe}>
      {error && <p className={error}>{error}</p>}
      {loading && <p className={loading}>Loading...</p>}
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
