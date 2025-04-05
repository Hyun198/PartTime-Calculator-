import React from 'react'
import './Navbar.style.css'
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faX, faHouse } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
    const navigate = useNavigate();
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