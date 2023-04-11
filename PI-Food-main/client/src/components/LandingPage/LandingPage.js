import React from 'react';

import { Link } from 'react-router-dom';
/* import './css/order.css'; */
import './landin.css';


export default function Landing() {
  return (
    <div className="intro">
      <div className="i__left">
        <div className="i__name">
          <h1> PI SPOONACULAR 2023</h1>
          <span>Lacabanne Roberto</span>
          <span>

          </span>

          <Link to="/home">
            <button className="button i__button">Get in</button>
          </Link>
        </div>
      </div>
    </div>
  );
}