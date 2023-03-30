import React from 'react';
import { useHistory } from 'react-router-dom';
import backgroundImage from '../../assets/polenta.jpg'; // Asegúrate de tener una imagen en la carpeta 'assets' o elige tu propia ruta

const LandingPage = () => {
  const history = useHistory();

  const handleEnter = () => {
    history.push('/home');
  };

  return (
    <div
      className="landing-page"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <button onClick={handleEnter} style={{ fontSize: '1.5rem' }}>
        Enter
      </button>
    </div>
  );
};

export default LandingPage;
