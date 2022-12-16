import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyC1vJk3_Ukvx_QNpWzF6Ga5DF5HyVm0u6E',
  authDomain: 'recipe-catalogue-3ebee.firebaseapp.com',
  projectId: 'recipe-catalogue-3ebee',
  storageBucket: 'recipe-catalogue-3ebee.appspot.com',
  messagingSenderId: '318032693938',
  appId: '1:318032693938:web:c3d7512cad2a826dedd7ab',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
