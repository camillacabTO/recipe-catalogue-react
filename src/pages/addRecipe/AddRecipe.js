import { useRef, useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const ingredientInputRef = useRef(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newRecipe = {
      title,
      cookingTime: time + ' minutes',
      instructions,
      ingredients,
      user: user.uid,
    };
    const collectionRef = collection(db, 'recipes');
    try {
      await addDoc(collectionRef, newRecipe);
      navigate('/');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddIngredient = (e) => {
    e.preventDefault();
    console.log(ingredients);
    const ingredient = ingredientInput.trim();

    if (ingredient && !ingredients.includes(ingredient)) {
      setIngredients((prevState) => [...prevState, ingredientInput]);
    }

    setIngredientInput('');
    ingredientInputRef.current.focus();
  };

  // postRequest is async. listen to data changing value from null to true once the post request is completed
  // useEffect(() => {
  //   if (data) {
  //     navigate('/');
  //   }
  // }, [data]);

  return (
    <div className='submitForm'>
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe Title: </span>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cooking Time: </span>
          <input
            type='number'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Ingredients: </span>
          <div className='ingredientsInput'>
            <input
              type='text'
              onChange={(e) => setIngredientInput(e.target.value)}
              value={ingredientInput}
              ref={ingredientInputRef}
            />
            <button onClick={handleAddIngredient}>Add</button>
          </div>
        </label>
        <p>
          {ingredients.map((item) => (
            <span>{item}, </span>
          ))}
        </p>
        <label>
          <span>Instructions: </span>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </label>
        <button type='submit'>Submit</button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
