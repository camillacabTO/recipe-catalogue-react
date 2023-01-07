import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw new Error('Could not login. Try again later.');
      }

      dispatch({ type: 'LOGIN', payload: userCredential.user });

      console.log(userCredential);
      setIsPending(false);
      setError(null);
      navigate('/');
    } catch (error) {
      console.log('error', error);
      setError(error.message);
      setIsPending(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login(email, password);
  };

  return (
    <div className='submitForm'>
      <h2>Login Here</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Email: </span>
          <input
            type='text'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Password: </span>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' disabled={isPending}>
          Login
        </button>
        {error && <p className='error'>{error}</p>}
        <p>
          Don't have an account? <Link to='/signup'>Sign Up</Link> now
        </p>
      </form>
    </div>
  );
}
