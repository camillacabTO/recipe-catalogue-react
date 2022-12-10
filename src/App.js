import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Search from './pages/search/Search';
import RecipeDetails from './pages/recipeDetails/RecipeDetails';
import Nav from './components/Nav';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <div className='container'>
          <Routes>
            <Route path='/search' element={<Search />} />
            <Route path='/add-recipe' element={<AddRecipe />} />
            <Route path='/recipes/:id' element={<RecipeDetails />} />
            <Route exact path='/' element={<Home />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
