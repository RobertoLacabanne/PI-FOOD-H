import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRecipes, searchRecipes } from '../../redux/actions/actions'; // Ahora 'searchRecipes' debería estar disponible


import './SearchBar.css'; // Importa el archivo de estilos correspondiente (si es necesario)

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchRecipes(searchTerm));
      setSearchTerm('');
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search recipes"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
