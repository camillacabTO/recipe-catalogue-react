import { createContext, useReducer, useEffect, useContext } from 'react';
import { auth } from '../firebase/firebase-config';
import { onAuthStateChanged } from 'firebase/auth';

const FirebaseAuthContext = createContext();

const initialState = {
  currentUser: null,
  authStateChecked: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_STATE_CHECKED':
      return { user: action.payload, authStateChecked: true };
    default:
      return state;
  }
};

export const FirebaseAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      dispatch({ type: 'AUTH_STATE_CHECKED', payload: user });
      //dispatches this action when the component first loads. Just once
      unsubscribe();
    });
  }, []);

  return (
    <FirebaseAuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(FirebaseAuthContext);
};
