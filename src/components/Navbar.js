import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav>
      <ul>
        <li className={activeLink === 'home' ? 'active' : ''} onClick={() => handleLinkClick('home')}>
          <FontAwesomeIcon icon={faHouse} />
        </li>
        <li className={activeLink === 'search' ? 'active' : ''} onClick={() => handleLinkClick('search')}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </li>
        <li className={activeLink === 'add' ? 'active' : ''} onClick={() => handleLinkClick('add')}>
          <FontAwesomeIcon icon={faPlus} />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
