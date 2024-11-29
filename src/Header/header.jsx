import React, { useState } from 'react'
import Moment from 'react-moment';
import cgv_logo from "../assets/cgv.png";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faHouse } from '@fortawesome/free-solid-svg-icons'
import useInterval from 'use-interval';
import './header.css'


export const daytime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
}

function Header() {

    let [nowTime, setNowTime] = useState(Date.now());


    const [isNavOpen, setIsNavOpen] = useState(false);
    const navigate = useNavigate();
    const today = daytime();
    let today_date = `${today.year}${today.month}${today.day}`
    const menu = [
        "home",
        "bus",
        "boxoffice",
    ]
    useInterval(() => {
        setNowTime(Date.now())
    }, 1000)

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
            <div className="today">
                <h2>{today.year}</h2>
                <span>{today.month}월{today.day}일</span>
                <Moment format={"HH:mm:ss"} style={{ "font-size": "28px" }}>{nowTime}</Moment>
            </div>

            <div className="cgv">
                <a href={`http://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0298&date=${today_date}`} style={{ width: 150 }}>
                    <img src={cgv_logo} alt="CGV Logo" className="header_img" />
                </a>
            </div>

            <div className="home-btn">
                <a href="/"><FontAwesomeIcon icon={faHouse} /></a>
            </div>

            <div className="menu-bars">
                <ul>
                    {menu.map((item, index) => (
                        <li id={index} onClick={() => handleGotoPage(item)}>{item}</li>
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