import React from "react";
import "./LeftSidebar.css"
import { FaAddressBook, FaBeer, FaHome, FaPersonBooth, FaProductHunt } from "react-icons/fa";
import { Route, Link } from "react-router-dom";

function LeftSidebar() {
    return (
        <div className="left-sidebar">

            <div className="left-sidebar-icons-div">

                <Link className="left-sidebar-links" to="/">
                    <FaHome className="left-sidebar-icons" />
                </Link>

                <Link className="left-sidebar-links" to="/employeesTaskManagmentPage">
                    <FaProductHunt className="left-sidebar-icons" />
                </Link>

                <Link className="left-sidebar-links" to="/showAllEmployeesData">
                    <FaAddressBook className="left-sidebar-icons" />
                </Link>

                {/* <Link className="left-sidebar-links" to="/">
                    <FaHome className="left-sidebar-icons" />
                </Link> */}

                {/* <Link className="left-sidebar-links" to="/">
                    <FaHome className="left-sidebar-icons" />
                </Link> */}

                <Link className="left-sidebar-links" to="/">
                    <FaHome className="left-sidebar-icons" />
                </Link>

                <div>
                    <Link className="left-sidebar-links" to="/">
                        <FaHome className="left-sidebar-icons" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default LeftSidebar;