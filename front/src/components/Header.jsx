import React from 'react';

// img import
import logo1 from '../images/public_logo_01.png';

const menuItems = { icon: logo1, path: "/home" };

function Header() {
  return (
    <div className='header_container'>
      <div className='box1'></div>

      <div className='header_logo'>
        <button href={menuItems.path}>
          <img src={menuItems.icon} alt="로고 이미지" />
        </button>
      </div>
    </div>
  );
}

export default Header;
