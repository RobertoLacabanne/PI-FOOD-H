import { combineReducers } from 'redux';
import recipesReducer from './recipesReducer'; // Importa tu recipesReducer
// Importa cualquier otro reducer que tengas aquí

const rootReducer = combineReducers({
  recipes: recipesReducer,
  // Otros reducers aquí
});

export default rootReducer;