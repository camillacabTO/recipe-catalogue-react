import { Link } from 'react-router-dom';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import styles from './RecipesList.module.scss';
import delete_icon from '../assets/delete_icon.svg';

export default function RecipesList({ recipes }) {
  if (recipes.length === 0) {
    return <div>No recipes found...</div>;
  }

  const handleClick = async (id) => {
    const userDoc = doc(db, 'recipes', id);
    await deleteDoc(userDoc);
  };

  return (
    <div className={styles.list}>
      {recipes.map((recipe) => (
        <div className={styles.card} key={recipe.id}>
          <div>
            <h3>{recipe.title}</h3>
            <img
              src={delete_icon}
              onClick={() => handleClick(recipe.id)}
              alt='delete-icon'
            />
          </div>
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
