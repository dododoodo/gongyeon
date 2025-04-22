import React, { useState, useEffect } from 'react';

// img import
import logo1 from '../images/public_logo_01.png';
import darkIcon from '../images/public_dark_01.png';
import lightIcon from '../images/public_light_01.png';

const menuItems = { icon: logo1, path: "/home" };

function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <div className='header_container'>
      <div className='box1'></div>

      <div className='header_logo'>
        <button onClick={() => window.location.href = menuItems.path}>
          <img src={menuItems.icon} alt="로고 이미지" />
        </button>
      </div>

      <div className='dark_mode'>
        <button onClick={toggleDarkMode}>
          <img 
            src={isDarkMode ? lightIcon : darkIcon}
            alt="다크모드 버튼 아이콘 이미지" 
          />
        </button>
      </div>
    </div>
  );
}

export default Header;
