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

// Action Creators
export const setRecipes = (recipes) => ({
  type: SET_RECIPES,
  payload: recipes,
});

export const setFilter = (filter) => ({
  type: SET_FILTER,
  payload: filter,
});

export const setSort = (sort) => ({
  type: SET_SORT,
  payload: sort,
});

export const setPage = (page) => ({
  type: SET_PAGE,
  payload: page,
});

export const incrementPage = () => ({
  type: INCREMENT_PAGE,
});

export const decrementPage = () => ({
  type: DECREMENT_PAGE,
});
export const fetchRecipes = () => {
  return async (dispatch) => {
    try {
      const response = await searchRecipesByName(''); // Utiliza searchRecipesByName en lugar de axios.get
      dispatch(setRecipes(response));
    } catch (error) {
      console.error(error);
    }
  };
};


export const searchRecipes = (searchTerm) => ({
  type: SEARCH_RECIPES,
  payload: searchTerm,
});

export const filterByDiet = (diet) => ({
    type: FILTER_BY_DIET,
    payload: diet,
  });
  
  export const filterBySource = (source) => ({
    type: FILTER_BY_SOURCE,
    payload: source,
  });

