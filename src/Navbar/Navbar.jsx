import React from 'react';
import './Navbar.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faBus, faTicket, faX } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Navbar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const menu = [
        { name: 'home', icon: faHouse },
        { name: 'bus', icon: faBus },
        { name: 'boxoffice', icon: faTicket },
    ];

    const handleGotoPage = (path) => {
        onClose(); // 사이드바 닫기
        path === 'home' ? navigate('/') : navigate(`/${path}`);
    };

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <FontAwesomeIcon icon={faX} onClick={onClose} />
                </div>
                <ul className="sidebar-menu">
                    {menu.map((item, idx) => (
                        <li key={idx} onClick={() => handleGotoPage(item.name)}>
                            <FontAwesomeIcon icon={item.icon} />
                            <span>{item.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            {isOpen && <div className="overlay" onClick={onClose}></div>}
        </>
    );
};

export default Navbar;
