import styles from './AddRecipe.module.css';
import { useEffect, useRef, useState } from 'react';
import { useFetch } from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export default function AddRecipe() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [instructions, setInstructions] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [ingredientInput, setIngredientInput] = useState('');
  const ingredientInputRef = useRef(null);
  const { data, error, postRequest } = useFetch(
    'http://localhost:3000/recipes',
    'POST'
  );
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    postRequest({
      title,
      cookingTime: time + ' minutes',
      instructions,
      ingredients,
    });
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
  useEffect(() => {
    if (data) {
      navigate('/');
    }
  }, [data]);

  return (
    <div>
      <h2>Create a New Recipe</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Receive Title</span>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cooking Time</span>
          <input
            type='number'
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Ingredients</span>
          <div>
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
          Ingredients:
          {ingredients.map((item) => (
            <span>* {item} </span>
          ))}
        </p>
        <label>
          <span>Instructions: </span>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
          <button>Submit</button>
        </label>
      </form>
    </div>
  );
}
