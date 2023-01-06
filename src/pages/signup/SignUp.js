import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { useAuth } from '../../contexts/AuthContext';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const signup = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (!userCredential) {
        throw new Error('Could not signup. Try again later.');
      }

      await updateProfile(auth.currentUser, {
        displayName: username,
      });

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
    if (password !== confirmedPassword) {
      return setError('Passwords do not match');
    }
    signup(email, password);
  };

  return (
    <div className='submitForm'>
      <h2>SignUp Here</h2>
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
          <span>Username: </span>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <label>
          <span>Confirm Password: </span>
          <input
            type='password'
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
            required
          />
        </label>
        <button type='submit' disabled={isPending}>
          Sign Up
        </button>
        {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
}
