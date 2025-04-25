import React from 'react';
import { useNavigate } from 'react-router-dom';

// img import
import logo1 from '../images/public_logo_01.png';

const menuItems = { icon: logo1, path: "/home" };

function Header() {
  const navigate = useNavigate();

  return (
    <div className='header_container'>
      <div className='header_logo'>
        <button onClick={() => navigate(menuItems.path)}>
          <img src={menuItems.icon} alt="로고 이미지" />
        </button>
      </div>
    </div>
  );
}

export default Header;
