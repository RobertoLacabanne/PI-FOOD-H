import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByDiet, filterBySource } from '../../redux/actions/actions'; // Ajusta la ruta de importación aquí


const Filters = () => {
  const dispatch = useDispatch();
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedSource, setSelectedSource] = useState('');

  const handleDietChange = (event) => {
    setSelectedDiet(event.target.value);
    dispatch(filterByDiet(event.target.value));
  };

  const handleSourceChange = (event) => {
    setSelectedSource(event.target.value);
    dispatch(filterBySource(event.target.value));
  };

  return (
    <div className="filters">
      <div className="filter">
        <label htmlFor="diet-filter">Filtrar por dieta:</label>
        <select
          name="diet-filter"
          id="diet-filter"
          value={selectedDiet}
          onChange={handleDietChange}
        >
          <option value="">Todas</option>
          {/* Aquí debes agregar las opciones de dieta necesarias */}
          <option value="vegan">Vegana</option>
          <option value="vegetarian">Vegetariana</option>
        </select>
      </div>
      <div className="filter">
        <label htmlFor="source-filter">Filtrar por origen:</label>
        <select
          name="source-filter"
          id="source-filter"
          value={selectedSource}
          onChange={handleSourceChange}
        >
          <option value="">Todos</option>
          <option value="api">API</option>
          <option value="database">Base de datos</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
