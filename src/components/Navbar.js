import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav class='navbar'>
      <ul>
        <li className={isActive('/')}><Link to='/'>
          <FontAwesomeIcon icon={faHouse} />
        </Link></li>
        <li className={isActive('/search')}><Link to='/search'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </Link></li>
        <li className={isActive('/add')}><Link to='/add'>
          <FontAwesomeIcon icon={faPlus} />
        </Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
