import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FormPage = () => {
    // Estados del formulario
    const [name, setName] = useState('');
    const [summary, setSummary] = useState('');
    const [healthScore, setHealthScore] = useState('');
    const [stepByStep, setStepByStep] = useState('');
    const [image, setImage] = useState('');
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [dietas, setDietas] = useState([]);

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar formulario aquí

    // Realizar llamada a la API para crear una nueva receta
    try {
      await axios.post('http://localhost:3001/recipes', {
        name,
        summary,
        healthScore,
        stepByStep,
        image,
        createIndb: true,
        diet: selectedDiets,
      });
      alert('Receta creada con éxito');
    } catch (error) {
      console.error('Error al crear la receta:', error);
    }
  };
  useEffect(() => {
    const fetchDietas = async () => {
      try {
        const response = await axios.get('http://localhost:3001/diets');
        setDietas(response.data);
      } catch (error) {
        console.error('Error al obtener las dietas:', error);
      }
    };

    fetchDietas();
}, []);

  // Función para manejar cambios en el campo de dietas seleccionadas
  const handleDietChange = (e) => {
    const { options } = e.target;
    const selectedOptions = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedDiets(selectedOptions);
  };

  return (
    <div>
      <h1>Crear nueva receta</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Resumen del plato:
          <textarea
            name="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          ></textarea>
        </label>
        <label>
          Nivel de comida saludable (health score):
          <input
            type="number"
            name="healthScore"
            value={healthScore}
            onChange={(e) => setHealthScore(e.target.value)}
          />
        </label>
        <label>
          Paso a paso:
          <textarea
            name="stepByStep"
            value={stepByStep}
            onChange={(e) => setStepByStep(e.target.value)}
          ></textarea>
        </label>
        <label>
          Imagen (URL):
          <input
            type="url"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <label>
          Tipos de dieta:
          <select multiple onChange={handleDietChange}>
            {/* Reemplaza 'dietas' con la lista de dietas que obtienes de la API */}
            {dietas.map((dieta) => (
              <option key={dieta.id} value={dieta.name}>
                {dieta.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Crear receta</button>
      </form>
    </div>
  );
};

export default FormPage;
