import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import { Link } from "react-router-dom";

const SidebarItem = ({ icon, text, link, subMenu }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <li className={`sidebar-item ${subMenu ? "has-menu" : ""}`}>
      <div className="main-link" onClick={subMenu ? toggleMenu : undefined}>
        {subMenu ? (
          <div className="link-container">
            {icon}
            <p>{text}</p>
            {subMenu && (isOpen ? <FaChevronUp /> : <FaChevronDown />)}
          </div>
        ) : (
          <Link to={link} className="link-container">
            {icon}
            <p>{text}</p>
          </Link>
        )}
      </div>
      {subMenu && isOpen && (
        <ul className="sub-menu">
          {subMenu.map((item, index) => (
            <li key={index}>
              <Link to={item.link} className="aside-link link-container">
                <p>{item.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
