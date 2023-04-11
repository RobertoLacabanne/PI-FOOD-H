import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Filter.css';
import {
  getAllDiet,
  orderByaz,
  orderByscore,
  filterBydiet,
  filtercreated,
} from '../../../redux/actions/actions';

export default function Filtros({ setorder, setscore }) {
  const dispatch = useDispatch();
  const diets = useSelector((state) => state.recipes.diets);

  useEffect(() => {
    dispatch(getAllDiet());
  }, [dispatch]);

  console.log('Diets:', diets);

  function handleOderByname(e) {
    console.log('handleOderByname called');
    dispatch(orderByaz(e.target.value));
    setorder(e.target.value);
  }

  function handleOrderScore(e) {
    console.log('handleOrderScore called');
    dispatch(orderByscore(e.target.value));
    setscore(e.target.value);
  }

  function handleFilterDiets(e) {
    console.log('handleFilterDiets called');
    dispatch(filterBydiet(e.target.value));
  }

  function handleFilterCreated(e) {
    console.log('handleFilterCreated called');
    dispatch(filtercreated(e.target.value));
  }

  function handleResetFilters(e) {
    console.log('handleResetFilters called');
    window.location.reload(false);
  }

  return (
    <div className="container__filtros">
      <select onChange={handleOderByname} name="orderaz" id="orderaz">
        <option value="asc">A-z</option>
        <option value="des">Z-A</option>
      </select>
      <select onChange={handleFilterDiets} name="diet" id="diet">
        <option value="default" disabled>
          Seleccione una opción..
        </option>
        <option value="all" defaultValue>
          All
        </option>
        {diets?.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      <select onChange={handleOrderScore} name="score" id="score">
        <option value="asc">Lower</option>
        <option value="des">Higher</option>
      </select>
      <select name="ifoapidb" onChange={handleFilterCreated}>
        <option value="all" defaultValue>
          All
        </option>
        <option value="api">Api</option>
        <option value="created">Created</option>
      </select>
      <button onClick={handleResetFilters}>Reset Filter</button>
    </div>
  );
}
