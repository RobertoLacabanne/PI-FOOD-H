import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { getAllrecipes, getAllDiet } from '../../redux/actions/actions';
import Filtros from './filters/Filtros';
import Card from './Card';
import Paginado from './Paginado';
import './styles/home.css';
import Navbar from './Navbar/Navbar';
import Loading from './Loading/Loading';
import Error404 from '../Error/Error404';

const HomePage = () => {
  const recipe = useSelector((state) => state.recipes.recipes);
  const page = useSelector((state) => state.recipes.page);
  const error = useSelector((state) => state.recipes.error);
  const allDiet = useSelector((state) => state.recipes.diets);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllrecipes());
    dispatch(getAllDiet());
  }, [dispatch]);

  const [order, setOrder] = useState(''); 
  const [score, setScore] = useState(''); 
 
  function sortAndFilterRecipes(recipes) {
    let sortedRecipes = [...recipes];
  
    if (order === "asc") {
      sortedRecipes.sort((a, b) => {
        if (!a.title || !b.title) {
          return 0;
        }
        return a.title.localeCompare(b.title);
      });
    } else if (order === "des") {
      sortedRecipes.sort((a, b) => {
        if (!a.title || !b.title) {
          return 0;
        }
        return b.title.localeCompare(a.title);
      });
    }
  
    if (score === "asc") {
      sortedRecipes.sort((a, b) => a.spoonacularScore - b.spoonacularScore);
    } else if (score === "des") {
      sortedRecipes.sort((a, b) => b.spoonacularScore - a.spoonacularScore);
    }
  
    return sortedRecipes;
  }
  

  /* funcion para Reiniciar los filtros */
  let sortedAndFilteredRecipes = sortAndFilterRecipes(recipe);

  /*----------------- Paginado Nuevo----------------- */
  let currenRecipes = [];
  const tamañoRecipe = recipe.length;
  const tamañoPorpagina = 9;
  let indexFinal = tamañoPorpagina * page; // 9 pagina
  let inicial = indexFinal - tamañoPorpagina; // 9-9=0
  if (Array.isArray(recipe)) {
    currenRecipes = recipe.slice(inicial, indexFinal);
  } else {
    console.error("recipe is not an array:", recipe);
    // Puedes manejar el caso de error aquí, por ejemplo, asignando un array vacío a currenRecipes
    currenRecipes = [];
  }

  /* const [loder, setloader] = useState(false); */
  if (Array.isArray(sortedAndFilteredRecipes)) {
    currenRecipes = sortedAndFilteredRecipes.slice(inicial, indexFinal);
  }
  
  return (
    <div>
      {/* -------------------Navbar------------------- */}
      <Navbar />

      {/* ------------Filtros----------*/}

      <div className="filter_paginate">
        <div className="filtros">
          {<Filtros diet={allDiet} setorder={setOrder} setscore={setScore} />}
        </div>
        <div className="paginate">
          {/* --------------Paginado-------------- */}
          <Paginado
            tamañoRecipe={tamañoRecipe}
            tamañoPorpagina={tamañoPorpagina}
            pageactual={page}
          />
        </div>
      </div>

      {/* ----------Card ----------*/}
      {error ? (
        <Error404 />
      ) : currenRecipes.length === 0 ? (
        <Loading />
      ) : (
        <div className="gallary_image_box">
          {currenRecipes?.map((recipe) => (
            <Card data={recipe} key={recipe.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
