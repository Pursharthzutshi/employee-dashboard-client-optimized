import React, { useEffect, useState } from "react";
import "./LoginUsers.css"
import "./LoginAdmin.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setLogOutStatus, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";
import { FaSadCry } from "react-icons/fa";

const checkUserLoggedInAuthQuery = gql`
mutation adminLogin($adminLoginParameters: createAdminLoginInput!){
  createAdminLogin(adminLoginParameters: $adminLoginParameters) {
  uid
    success
    message
    token
    admin
  }
}
`

function LoginAdmin() {


    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)


    const Dispatch = useAppDispatch()
    // const [] = useState("");
    // const [] = useState()
    const navigate = useNavigate()

    const [checkAdminLoggedInAuth] = useMutation(checkUserLoggedInAuthQuery, {
        onCompleted: (data) => {

            console.log(data)
            if (data.createAdminLogin.admin === true) {
                Dispatch(setAdminStatus(true))
                navigate("/home")
                Dispatch(setShowLogOutButtonElements(true));
                Dispatch(setLoggedInSavedUid(data.createAdminLogin.uid));
            } else {
                Dispatch(setShowLogOutButtonElements(false));
            }
        },
    });


    const loginForm = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

    }

    return (
        <div className="login-component">
            <ChangeLogInFormButtons />
            <div className="login-left-sidebar-form-container">
            
                <form onSubmit={loginForm} className="login-form">
                    <h3>Admin Login In Form</h3>
                    <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                    <input type="password" placeholder="password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                    <button className="login-button" onClick={() => {
                        {
                            checkAdminLoggedInAuth({
                                variables: {
                                    adminLoginParameters: {
                                        emailId: userLoggedinEmailId,
                                        password: userLoggedInEmailPassword
                                    }
                                }
                            })
                        }
                    }}>Login</button>
                    <p>OR</p>
                    <p>Create a admin account now</p>
                    <Link to="/signUpAdmin">
                        <button className="sign-up-admin-button">Sign Up</button>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default LoginAdmin;