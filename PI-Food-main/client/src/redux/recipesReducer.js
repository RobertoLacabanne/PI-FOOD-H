// recipesReducer.js

const initialState = {
  recipes: [],
  filteredRecipes: [],
  page: 1,
  totalPages: 10,
  diets: [],
  filter: { diet: 'all', source: 'all' }, // agregar una propiedad filter al estado inicial
  sort: { property: 'name', order: 'asc' }, // agregar una propiedad sort al estado inicial
};


const recipesReducer = (state = initialState, action) => {
  switch (action.type) {
    // ...
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    default:
      return state;
  }
};

export default recipesReducer;
