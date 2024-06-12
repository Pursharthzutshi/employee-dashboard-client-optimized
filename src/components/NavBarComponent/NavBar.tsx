import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import DropDown from "../utils/DropDown";
import "../NavBarComponent/NavBar.css"
function NavBar(){
    
    const [test, setTest] = useState(false);

    const change = () => {
        setTest(!test)
    }

    return(
        <div>
            
            <div className="nav-bar-search-bar-container">

                <div className="nav-bar-search-bar-div">
                    <input className="nav-bar-search-bar" type="text" placeholder="Search" />
                </div>

                <div className="nav-bar-profile-icon-div">
                    <FaUser className="user-profile-icon" onClick={() => change()}>Icon</FaUser>
                    <DropDown test={test} />
                </div>

            </div>
        </div>
    )
}

export default NavBar;