import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.scss';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm.toLowerCase()}`);
  };

  return (
    <div className={styles.searchBar}>
      <form>
        <input
          type='text'
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Search Recipes by Ingredients'
          value={searchTerm}
          required
        ></input>
        <button onClick={handleSubmit}>
          <i className='fa fa-search'></i>
        </button>
      </form>
      <em>*Use space between ingredients</em>
    </div>
  );
}
