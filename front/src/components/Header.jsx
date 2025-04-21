import React from 'react';

// img import
import logo1 from '../images/public_logo_01.png';
import dark from '../images/public_dark_01.png';

const menuItems = { icon: logo1, path: "/home" };
const darkmode = { icon: dark, path: "/home" };

function Header() {
  return (
    <div className='header_container'>
      <div className='box1'></div>

      <div className='header_logo'>
        <a href={menuItems.path}>
          <img src={menuItems.icon} alt="로고 이미지" />
        </a>
      </div>

      <div className='dark_mode'>
        <a href={darkmode.path}>
          <img src={darkmode.icon} alt="로고 이미지" />
        </a>
      </div>
    </div>
  );
}

export default Header;
