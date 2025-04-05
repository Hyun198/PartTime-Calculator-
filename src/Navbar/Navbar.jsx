import React from 'react'
import './Navbar.style.css'
import { useNavigate, useLocation } from 'react-router-dom';


const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const hideOnPaths = ['/bus'];
    if (hideOnPaths.includes(location.pathname)) {
        return null;
    }

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

    return (
        <div className="bottom-nav" >
            {
                menu.map((item, index) => {
                    return (
                        <div key={index} className="nav-item" onClick={() => handleGotoPage(item)}>

                            <div>{item}</div>
                        </div>
                    )

                })
            }

        </div>

    )

}

export default Navbar