import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBar.module.css';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Search: </span>
          <input
            type='text'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            required
          />
        </label>
      </form>
    </div>
  );
}
