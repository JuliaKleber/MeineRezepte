import React from './RecipeAdded';
import { Link } from 'react-router-dom';

const RecipeNotAdded = () => {

  return (
    <div className='container'>
      <p>Das Rezept konnte nicht gespeichert werden.</p>
      <Link exact to='/'>
        <button>zum Startmenü</button>
      </Link>
    </div>
  );
}

export default RecipeNotAdded;
