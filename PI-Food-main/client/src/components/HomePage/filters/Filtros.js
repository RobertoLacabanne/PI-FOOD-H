// ../client/component/filters/Filtros.js

import React from 'react';
import { useDispatch } from 'react-redux';
import './Filter.css';
import {
  orderByaz,
  orderByscore,
  filterBydiet,
  filtercreated,
} from '../../../redux/actions/actions';

export default function Filtros({ diet, setorder, setscore }) {
  const dispatch = useDispatch();


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
      {/* ------------Ordenar de a-z z-a------------ */}
      <select onChange={handleOderByname} name="orderaz" id="orderaz">
        <option value="asc">A-z</option>
        <option value="des">Z-A</option>
      </select>
      {/*-------------All dietas al select------------ */}
      <select onChange={handleFilterDiets} name="diet" id="diet">
        <option value="defauls" disabled>
          seleccione..
        </option>
        <option value="all" defaultValue>
          All
        </option>
        {diet?.map((el) => (
          <option value={el.name} key={el.id}>
            {el.name}
          </option>
        ))}
      </select>

      {/* Filtrar por puntaje Score */}
      <select onChange={handleOrderScore} name="score" id="score">
        <option value="asc">Lower</option>
        <option value="des">Higher</option>
      </select>

      {/* filtrar los de la base de dtaos */}
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
