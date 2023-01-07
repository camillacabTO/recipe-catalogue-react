import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase-config';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import styles from './AuthBar.module.scss';

export default function AuthBar() {
  const navigate = useNavigate();
  const { user, dispatch } = useAuth();

  const handleClickLogOut = async (event) => {
    await signOut(auth);
    dispatch({ type: 'LOGOUT' });
    navigate('/login');
  };

  return (
    <div className={styles.auth_bar}>
      {user && (
        <>
          <h4>Hello, {user.displayName ? user.displayName : user.email}</h4>
          <div>
            <button onClick={handleClickLogOut}>LogOut</button>
          </div>
        </>
      )}
    </div>
  );
}
