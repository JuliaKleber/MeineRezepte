import React from './RecipeAdded';
import { NavLink } from 'react-router-dom';

const RecipeNotAdded = () => {

  return (
    <div className='container'>
      <p>Das Rezept konnte nicht gespeichert werden.</p>
      <NavLink exact to='/'>
        <button>zum Startmenü</button>
      </NavLink>
    </div>
  );
}

export default RecipeNotAdded;
