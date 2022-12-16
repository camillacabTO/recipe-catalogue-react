import { useSearchParams } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import RecipesList from '../../components/RecipesList';

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  const url = `http://localhost:3000/recipes?q=${query}`;
  const { data: foundRecipes, error, isPending } = useFetch(url);

  return (
    <div>
      <h2>Your search results:</h2>
      {error && <p className={error}>{error}</p>}
      {isPending && <p className={isPending}>Loading...</p>}
      {foundRecipes && <RecipesList recipes={foundRecipes} />}
    </div>
  );
}
