import React from "react";
import image from "../../../RegisterComponent/images/employee.png"
import { useAppSelector } from "../../../../ReduxHooks";
import { gql } from "@apollo/client";
import "../WelcomeBackComponent/WelcomeBack.css"

function WelcomeBack() {

    const savedLoggedInUserName = useAppSelector((state) => state.LocalStorageSlicer.savedLoggedInName)

    // const fetchAdminAccountDetails  = gql`

    // `

    return (
        <div className="welcome-back-card-container">
            <div className="welcome-back-card-div">
                <img src={image} />
                <h3>Welcome Back {savedLoggedInUserName}</h3>
            </div>
            <div>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis accumsan elementum. Ut non fringilla tellus, vel iaculis orci. Vestibulum tristique finibus arcu id accumsan. Ut nec nisi vitae nulla posuere faucibus. Aliquam quis dui sit amet neque vestibulum lobortis. Curabitur lobortis nec augue ac euismod. Curabitur fermentum, tellus sed cursus ultrices, metus massa rutrum enim, at pretium mi lacus sed nulla. Sed sed ante risus.</p>
                {/* <button>View Task</button> */}
            </div>
        </div>

    )
}

export default WelcomeBack