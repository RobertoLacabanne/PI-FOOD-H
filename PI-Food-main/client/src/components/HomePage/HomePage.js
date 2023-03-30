import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import SearchBar from './SearchBar';
import CardList from './CardList';
import Filters from './Filters';
import Pagination from './Pagination';
import { setRecipes, fetchRecipes } from '../../redux/actions/actions'; // Importa las acciones necesarias de Redux
import './HomePage.css'; // Importa el archivo de estilos correspondiente (si es necesario)

const HomePage = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes.filteredRecipes); // Accede a las recetas filtradas del estado de Redux

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  return (
    <div className="home-page">
      <SearchBar />
      <Filters />
      <CardList recipes={recipes} />
      <Pagination />
    </div>
  );
};

export default HomePage;
