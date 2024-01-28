import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <ul>
        <li><Link to='/home' className={({ isActive }) => isActive ? "active" : "not-active" }>
          <FontAwesomeIcon icon={faHouse} />
        </Link></li>
        <li><Link to='/search' className={({ isActive }) => isActive ? "active" : "not-active" }>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link></li>
        <li><Link to='/add' className={({ isActive }) => isActive ? "active" : "not-active" }>
          <FontAwesomeIcon icon={faPlus} />
        </Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
