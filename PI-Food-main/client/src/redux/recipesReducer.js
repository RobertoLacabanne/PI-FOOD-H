import {
  GET_ALL_RECIPE,
  GET_ALL_DIET,
  RECIPE_DETAILS,
  PAGINADO,
  ORDER_BY_NAME,
  ORDER_BY_SCORE,
  FILTER_BY_DIET,
  FILTER_DB_OR_API,
  SEARCH_NAME_RECYPE,
  POST_ADD_RECIPES,
  SET_ERROR,
} from '../redux/actions/actions';

const initialState = {
  recipes: [],
  allrecipes: [],
  diets: [],
  details: [],
  page: 1,
  totalPages: 10,
  error: undefined,
};

const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPE:
      return {
        ...state,
        recipes: action.payload,
        allrecipes: action.payload,
        page: state.page < action.payload.length ? state.page : 1,
        error: undefined,
      };
    case POST_ADD_RECIPES:
      return {
        ...state,
      };
    case RECIPE_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case SEARCH_NAME_RECYPE:
      return {
        ...state,
        recipes: action.payload,
        error: undefined,
        page: state.page < action.payload.length ? state.page : 1,
      };
      case GET_ALL_DIET:

        return {
          ...state,
          diets: action.payload,
        };
    case PAGINADO:
      return {
        ...state,
        page: action.payload,
      };
    case ORDER_BY_NAME:
      const sortedByName =
        action.payload === 'asc'
          ? state.recipes.sort((a, b) => a.name.localeCompare(b.name))
          : state.recipes.sort((a, b) => b.name.localeCompare(a.name));
      return {
        ...state,
        allrecipes: sortedByName,
        page: 1,
      };
    case ORDER_BY_SCORE:
      const sortedByScore =
        action.payload === 'asc'
          ? state.recipes.sort((a, b) => a.healthScore - b.healthScore)
          : state.recipes.sort((a, b) => b.healthScore - a.healthScore);
      return {
        ...state,
        allrecipes: sortedByScore,
        page: 1,
      };
case FILTER_BY_DIET:
  const allrecipes = state.allrecipes;
  const filteredByDiet =
    action.payload === 'all'
      ? allrecipes
      : allrecipes.filter((el) => {
          let names = el.diets.map((d) => d.name);
          return names.includes(action.payload);
        });
        return {
          ...state,
          recipes: filteredByDiet,
          page: state.page < filteredByDiet.length ? state.page : 1,
        };
    case FILTER_DB_OR_API:
      const allcreated = state.allrecipes;
      const filteredBySource =
        action.payload === 'created'
          ? allcreated.filter((el) => el.createIndb === true)
          : allcreated.filter((el) => el.createIndb === false);
      return {
        ...state,
        recipes: action.payload === 'all' ? state.allrecipes : filteredBySource,
        page: 1,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        recipes: [],
        allrecipes: [],
      };
    default:
      return state;
  }
};

export default recipesReducer;
