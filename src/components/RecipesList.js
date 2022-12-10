import { Link } from 'react-router-dom';
import styles from './RecipesList.module.scss';

export default function RecipesList({ recipes }) {
  if (recipes.length === 0) {
    return <div>No recipes found...</div>;
  }

  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <div className={styles.card} key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>
            <span>Cook Time: </span>
            {recipe.cookingTime}
          </p>
          <p>
            <span>Directions: </span>
            {recipe.instructions.substr(0, 100)}...
          </p>
          <Link to={`/recipes/${recipe.id}`}>Cook This</Link>
        </div>
      ))}
    </div>
  );
}
