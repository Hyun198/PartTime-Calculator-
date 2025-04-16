import React, { useState } from 'react'
import Moment from 'react-moment';
import cgv_logo from "../assets/cgv.png";
import useInterval from 'use-interval';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faBars } from '@fortawesome/free-solid-svg-icons'
import './header.css'
import Navbar from '../Navbar/Navbar';


export const daytime = () => {
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, "0");
    let day = date.getDate().toString().padStart(2, "0");

    return { year, month, day };
}

function Header() {

    let [nowTime, setNowTime] = useState(Date.now());
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const today = daytime();
    let today_date = `${today.year}${today.month}${today.day}`

    useInterval(() => {
        setNowTime(Date.now())
    }, 1000)


    return (

        <div className="header-container" >
            <div className="today">
                <span>{today.year}</span>
                <span>{today.month}월{today.day}일</span>
                <Moment format={"HH:mm"} style={{ "fontSize": "28px" }}>{nowTime}</Moment>
            </div>

            <div className="cgv">
                <a href={`http://www.cgv.co.kr/theaters/?areacode=02&theaterCode=0298&date=${today_date}`} style={{ width: 150 }}>
                    <img src={cgv_logo} alt="CGV Logo" className="header_img" />
                </a>
            </div>

            <div className="hamburger-btn" onClick={() => setIsSidebarOpen(true)}>
                <FontAwesomeIcon icon={faBars} />
            </div>

            {/* <div className="home-btn">
                <a href="/"><FontAwesomeIcon icon={faHouse} /></a>
            </div> */}


            <Navbar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

        </div>


    )
}


export default Header