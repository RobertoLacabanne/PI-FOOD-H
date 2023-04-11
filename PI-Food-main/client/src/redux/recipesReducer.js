// recipesReducer.js


import {
  GET_ALL_RECIPE,
  GET_ALL_DIET,
  RECIPE_DETAILS,
  PAGINADO,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  FILTER_BY_DIET,
  FILTER_DB_OR_API,
} from '../redux/actions/actions';


const initialState = {
  recipes: [],
  filteredRecipes: [],
  page: 1,
  totalPages: 10,
  diets: [],
  details: [], 
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_ALL_RECIPES':
      console.log('GET_ALL_RECIPES action', action); // Agregar console.log aquí
      return {
        ...state,
        recipes: action.payload,
      };
    case 'GET_ALL_DIET':
      console.log('GET_ALL_DIET action', action); // Agregar console.log aquí
      return {
        ...state,
        diets: action.payload,
      };
    case 'RECIPE_DETAILS':
      console.log('RECIPE_DETAILS action', action); // Agregar console.log aquí
      return {
        ...state,
        details: action.payload,
      };
    case PAGINADO:
      return {
        ...state,
        page: action.payload,
      };
      case ORDER_BY_NAME:
        console.log('ORDER_BY_NAME action', action);
        const sortedByName = [...state.recipes].sort((a, b) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          if (action.payload === 'asc') {
            return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
          } else {
            return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
          }
        });
        return {
          ...state,
          recipes: sortedByName,
        };
      case ORDER_BY_SCORE:
        console.log('ORDER_BY_SCORE action', action);
        const sortedByScore = [...state.recipes].sort((a, b) => {
          if (action.payload === 'asc') {
            return a.healthScore - b.healthScore;
          } else {
            return b.healthScore - a.healthScore;
          }
        });
        return {
          ...state,
          recipes: sortedByScore,
        };
      case FILTER_BY_DIET:
        console.log('FILTER_BY_DIET action', action);
        const filteredByDiet = state.recipes.filter((recipe) =>
          recipe.diets.includes(action.payload)
        );
        return {
          ...state,
          filteredRecipes: filteredByDiet,
        };
      case FILTER_DB_OR_API:
        console.log('FILTER_DB_OR_API action', action);
        const filteredBySource = state.recipes.filter((recipe) => {
          if (action.payload === 'all') {
            return true;
          } else if (action.payload === 'api') {
            return !recipe.id.toString().includes('-');
          } else {
            return recipe.id.toString().includes('-');
          }
        });
        return {
          ...state,
          filteredRecipes: filteredBySource,
        };
      default:
        return state;
    }
  };

export default recipesReducer;
