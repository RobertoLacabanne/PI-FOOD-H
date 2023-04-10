import { createSelector } from 'reselect';

const getRecipes = (state) => state.recipes.allRecipes;
const getFilter = (state) => state.recipes.filter;
const getSort = (state) => state.recipes.sort;
const getCurrentPage = (state) => state.recipes.page;

export const getFilteredSortedPaginatedRecipes = createSelector(
  [getRecipes, getFilter, getSort, getCurrentPage],
  (recipes, filter, sort, currentPage) => {
    // Filtrar las recetas por dietas y fuentes
    let filteredRecipes = recipes.filter((recipe) => {
      const matchesDiet = filter.diet === 'all' || recipe.diets.includes(filter.diet);
      const matchesSource = filter.source === 'all' || recipe.source === filter.source;
      return matchesDiet && matchesSource;
    });

    // Ordenar las recetas
    filteredRecipes.sort((a, b) => {
      const valueA = sort.property === 'name' ? a.name.toLowerCase() : a.healthScore;
      const valueB = sort.property === 'name' ? b.name.toLowerCase() : b.healthScore;

      if (valueA < valueB) return sort.order === 'asc' ? -1 : 1;
      if (valueA > valueB) return sort.order === 'asc' ? 1 : -1;
      return 0;
    });

    // Paginar las recetas
    const recipesPerPage = 9;
    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;

    return filteredRecipes.slice(startIndex, endIndex);
  }
);
