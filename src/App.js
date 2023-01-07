import {
  Route,
  Routes,
  BrowserRouter as Router,
  Navigate,
} from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import AddRecipe from './pages/addRecipe/AddRecipe';
import Search from './pages/search/Search';
import RecipeDetails from './pages/recipeDetails/RecipeDetails';
import Nav from './components/Nav';
import SignUp from './pages/signup/SignUp';
import { useAuth } from './contexts/AuthContext';
import Login from './pages/login/Login';

function App() {
  const { user, authStateChecked } = useAuth();

  return (
    <>
      {authStateChecked && (
        <Router>
          <Nav />
          <div className='container'>
            <Routes>
              <Route
                path='/search'
                element={user ? <Search /> : <Navigate to='/login' />}
              />
              <Route
                path='/add-recipe'
                element={user ? <AddRecipe /> : <Navigate to='/login' />}
              />
              <Route
                path='/recipes/:id'
                element={user ? <RecipeDetails /> : <Navigate to='/login' />}
              />
              <Route
                path='/signup'
                element={!user ? <SignUp /> : <Navigate to='/' />}
              />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to='/' />}
              />
              <Route
                exact
                path='/'
                element={user ? <Home /> : <Navigate to='/login' />}
              />
            </Routes>
          </div>
        </Router>
      )}
    </>
  );
}

export default App;
