
const initialState = {
    recipes: [],
    filteredRecipes: [],
    page: 1,
    totalPages: 10, // Agrega la propiedad totalPages al estado inicial
  };
  
  const recipesReducer = (state = initialState, action) => {
    switch (action.type) {
      // ...
      case 'SET_PAGE':
        return {
          ...state,
          page: action.payload,
        };
      case 'FILTER_RECIPES':
        return {
          ...state,
          filteredRecipes: state.recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };
      default:
        return state;
    }
  };
  
  export default recipesReducer;
  