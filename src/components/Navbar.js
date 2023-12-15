import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

  return (
    <nav className='navbar'>
      <ul>
        <li><NavLink exact to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </NavLink></li>
        <li><NavLink exact to='/search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </NavLink></li>
        <li><NavLink exact to='/add'>
          <FontAwesomeIcon icon={faPlus} />
        </NavLink></li>
      </ul>
    </nav>
  );
}

export default Navbar;
