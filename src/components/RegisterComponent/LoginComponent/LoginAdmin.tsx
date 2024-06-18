import React, { useEffect, useState } from "react";
import "./LoginAdmin.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { setAdminStatus, setLoggedInSavedUid, setLogOutStatus, setShowLogOutButtonElements } from "../../../ReduxSlicers/LocalStorageSlicer";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";

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


    const loginForm = (e: any) => {
        e.preventDefault()

    }

    return (
        <div>
            <ChangeLogInFormButtons />
            <form onSubmit={loginForm} className="login-form">
                <h3>Admin Login In Form</h3>
                <input type="text" placeholder="EmailId" onChange={(e) => Dispatch(setUserLoggedInEmailId(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e) => Dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                <button onClick={() => {
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
                <Link to="/signUpAdmin">
                    <button>Sign Up</button>
                </Link>
            </form>
        </div>
    )
}

export default LoginAdmin;