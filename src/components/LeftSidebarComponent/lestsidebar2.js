import React, { useEffect } from "react";
import "./LeftSidebar.css"
import { FaAddressBook, FaBeer, FaChevronCircleUp, FaCogs, FaHome, FaPersonBooth, FaProductHunt, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { Route, Link } from "react-router-dom";
import { setShowLogOutButtonElements, setLogOutStatus, setAdminStatus } from "../../ReduxSlicers/LocalStorageSlicer";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";



function LeftSidebar() {
    const showLogOutButtonElements = useAppSelector((state: any) => state.LocalStorageSlicer.showLogOutButtonElements)

    const Dispatch = useAppDispatch();

    const logout = () => {
        Dispatch(setShowLogOutButtonElements(false))
        Dispatch(setLogOutStatus(false))
        Dispatch(setAdminStatus(false))
    }

    return (
        <div className="left-sidebar">
            {/* <h4>Dashboard</h4> */}
            <div className="left-sidebar-links-icons-div">

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

                    <Link className="left-sidebar-links" to="/signup">
                        <FaUserPlus className="left-sidebar-icons" />
                    </Link>
                    <Link className="left-sidebar-links" to="/signup">
                        <FaCogs className="left-sidebar-icons" />
                    </Link>
                </div>
                <div className="left-sidebar-links-div">

                    <Link className="left-sidebar-links" to="/">
                        <p >Home</p>
                    </Link>

                    <Link className="left-sidebar-links" to="/employeesTaskManagmentPage">
                        <p >Tasks</p>
                    </Link>

                    <Link className="left-sidebar-links" to="/showAllEmployeesData">
                        <p >Details</p>

                    </Link>

                    <Link className="left-sidebar-links" to="/signup">
                        <p >Add Employee</p>
                    </Link>
                    <Link className="left-sidebar-links" to="/signup">
                        <p >Settings</p>
                    </Link>
                </div>
            

            </div>
            {
                    showLogOutButtonElements ?

                        <FaSignOutAlt onClick={logout} /> :
                        <Link to="/login">
                            <FaSignInAlt to="/login" />
                            <p>Login</p>
                        </Link>
                }
        </div>
    )
}

export default LeftSidebar;