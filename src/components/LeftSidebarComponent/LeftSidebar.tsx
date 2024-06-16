import React, { useEffect } from "react";
import "./LeftSidebar.css"
import { FaAddressBook, FaBeer, FaChevronCircleUp, FaHome, FaPersonBooth, FaProductHunt } from "react-icons/fa";
import { Route, Link } from "react-router-dom";
import { setShowLogOutButtonElements, setLogOutStatus, setAdminStatus } from "../../ReduxSlicers/LocalStorageSlicer";
import { useAppDispatch, useAppSelector } from "../../ReduxHooks";



function LeftSidebar() {
    const showLogOutButtonElements = useAppSelector((state:any)=>state.LocalStorageSlicer.showLogOutButtonElements)

    const Dispatch = useAppDispatch();

    const logout = () =>{
        Dispatch(setShowLogOutButtonElements(false))
        Dispatch(setLogOutStatus(false))
        Dispatch(setAdminStatus(false))

    }

    useEffect(()=>{
        console.log(showLogOutButtonElements)
    })
    return (
        <div className="left-sidebar">
            {
                showLogOutButtonElements && 
                
                <FaChevronCircleUp onClick={logout}/>
            }
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