import React, { useState } from 'react'
import cgv_logo from "../assets/cgv.png";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX } from '@fortawesome/free-solid-svg-icons'
import './header.css'


export const daytime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
}

function Header() {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();

    const today = daytime();

    let todaydate = `${today.year}${today.month}${today.day}`

    const menu = [
        "home",
        "bus",
        "boxoffice",
    ]


    const handleGotoPage = (param) => {
        if (param === "home") {
            navigate("/")
        } else {
            navigate(`/${param}`)
        }


    }

    const toggleNav = () => {
        setIsNavOpen(!isNavOpen);
    }

    return (

        <div className="header-container" >

            <div className="today" >
                <h2>{today.year}</h2>
                <span>{today.month}월{today.day}일</span>
            </div>

            <div className="cgv" >
                <a href={`http://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0298&date=${todaydate}`} style={{ width: 150 }}>
                    <img src={cgv_logo} alt="CGV Logo" className="header_img" />
                </a>
            </div>

            {/* <div className="home-btn">
                <FontAwesomeIcon icon={faHouse} onClick={GotoHome} />
            </div> */}

            <div className="menu-bars">
                <ul>
                    {menu.map((item, index) => (
                        <li id={index} onClick={() => handleGotoPage(item)}>#{item}</li>
                    ))}
                </ul>
            </div>


            {/* 햄버거 메뉴 아이콘 */}
            <div className="hamburger-menu" onClick={toggleNav}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            {/* 반응형 사이드바 메뉴 */}
            <div className={`nav-bar ${isNavOpen ? "open" : ""}`}>
                <FontAwesomeIcon className="faX" icon={faX} onClick={toggleNav} />
                <ul>
                    {menu.map((item, index) => (
                        <li key={index} onClick={() => handleGotoPage(item)}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>


    )
}


export default Header