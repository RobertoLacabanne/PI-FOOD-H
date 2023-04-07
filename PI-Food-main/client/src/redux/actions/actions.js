

import axios from 'axios';
import { searchRecipesByName } from '../../api';

// ActionTypes
export const SET_RECIPES = 'SET_RECIPES';
export const SET_FILTER = 'SET_FILTER';
export const SET_SORT = 'SET_SORT';
export const SET_PAGE = 'SET_PAGE';
export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const DECREMENT_PAGE = 'DECREMENT_PAGE';
export const SEARCH_RECIPES = 'SEARCH_RECIPES';
export const FILTER_BY_DIET = 'FILTER_BY_DIET';
export const FILTER_BY_SOURCE = 'FILTER_BY_SOURCE';

export const GET_ALL_RECIPE = 'GET_ALL_RECIPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';
export const GET_ALL_DIET = 'GET_ALL_DIET';
export const ORDER_BY_SCORE = 'ORDER_BY_SCORE';
export const PAGINADO = 'PAGINADO';
export const RECIPE_DETAILS = 'RECIPE_DETAILS';
export const SEARCH_NAME_RECYPE = 'SEARCH_NAME_RECYPE';
export const POST_ADD_RECIPES = 'POST_ADD_RECIPES';
export const FILTER_DB_OR_API = 'FILTER_DB_OR_API';
export const SET_ERROR = 'SET_ERROR';

// Action Creators

export const getAllrecipes = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/recipes');
    dispatch({ type: 'GET_ALL_RECIPES', payload: res.data });
  } catch (error) {
    console.error('AxiosError', error);
  }
};

export function postAddRecipes(payload) {
  return function () {
    return axios
      .post('/recipes', payload)
      .then((json) => {
        alert('Receta Creada Exitosa');
      })
      .catch((error) => {
        alert('Receta Fallida');
      });
  };
}

export const getAllDiet = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:4000/diets');
    dispatch({ type: 'GET_ALL_DIETS', payload: res.data });
  } catch (error) {
    console.error('No se Han podido cargar las dietas', error);
  }
};

export const getNamerecipes = (name) => {
  return async function (dispatch) {
    try {
      let json = await axios.get('http://localhost:4000/recipes?name=' + name);
      return dispatch({
        type: SEARCH_NAME_RECYPE,
        payload: json.data,
      });
    } catch (err) {
      dispatch({ type: SET_ERROR, payload: err });
    }
  };
};


export const recipesDetils = (id) => {
  return async function (dispatch) {
    let json = await axios.get('recipes/' + id);
    return dispatch({
      type: RECIPE_DETAILS,
      payload: json.data,
    });
  };
};

export function filterBydiet(diet) {
  return {
    type: FILTER_BY_DIET,
    payload: diet,
  };
}

export function orderByaz(order) {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
}

export function orderByscore(score) {
  return {
    type: ORDER_BY_SCORE,
    payload: score};
  }
  
  export function paginado(numero) {
  return (dispatch) => {
  dispatch({ type: PAGINADO, payload: numero });
  };
  }
  
  export function filtercreated(data) {
  return {
  type: FILTER_DB_OR_API,
  payload: data,
  };
  }
