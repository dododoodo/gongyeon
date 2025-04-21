import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
// image import
import homeIcon from '../images/public_tab_01.png';
import searchIcon from '../images/public_tab_02.png';
import showIcon from '../images/public_tab_03.png';
import profileIcon from '../images/public_tab_04.png';

function TabBar() {
  const location = useLocation();
  const menuItems = [
    { icon: homeIcon, text: "Home", path: "/home" },
    { icon: searchIcon, text: "Search", path: "/search" },
    { icon: showIcon, text: "Show", path: "/myshows" },
    { icon: profileIcon, text: "Profile", path: "/mypage" }
  ];

  const isActive = (path) => {
    if (path === "/search") {
      return [
        "/search",
        "/category",
        "/contents"
      ].some(p => location.pathname.startsWith(p));
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="tab-menu">
      <ul className="tab-menu_list">
        {menuItems.map((item, index) => {
          const active = isActive(item.path);
          return (
            <motion.li 
              key={index} 
              className={`tab-menu_item ${active ? 'tab-menu_active' : ''}`}
              initial={{ scaleX: 1 , scaleY:1 }}
              whileHover={{ scale: 1.1 }}
              animate={{ transition: { ease: "easeInOut" }, scaleX: 1.1, scaleY: 1.1}}
            >
              <NavLink to={item.path} className="tab-menu_link">
                <span className="tab-menu_icon">
                  <img src={item.icon} alt={item.text} className="tab-menu_image" />
                </span>
                <span className="tab-menu_text">{item.text}</span>
              </NavLink>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

export default TabBar;
