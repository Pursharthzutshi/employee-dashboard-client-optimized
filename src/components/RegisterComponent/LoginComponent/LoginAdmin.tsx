import React, { useEffect, useState } from "react";
import "./LoginAdmin.css"
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserLoggedInEmailId, setUserLoggedInEmailPassword } from "../../../ReduxSlicers/LoginSlicer";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { setLoggedInSavedEmailId } from "../../../ReduxSlicers/LocalStorageSlicer";
import ChangeLogInFormButtons from "./ChangeLogInFormButtons";

const checkUserLoggedInAuthQuery = gql`
mutation userLogin($userLoginParameters: createLoginInput!){
  createUserLogin(userLoginParameters: $userLoginParameters) {
  success
  message
  }
}
`

function LoginAdmin() {


    const userLoggedinEmailId = useAppSelector((state) => state.LoginSlicer.userLoggedinEmailId)
    const userLoggedInEmailPassword = useAppSelector((state) => state.LoginSlicer.userLoggedinPassword)

    const dispatch = useAppDispatch()
    // const [] = useState("");
    // const [] = useState()
    const navigate = useNavigate()

    const [checkUserLoggedInAuth] = useMutation(checkUserLoggedInAuthQuery, {
        onCompleted: (data) => {

            console.log(data)
            if (data.createUserLogin.success === true) {
                console.log(false);
                navigate("/")
                dispatch(setLoggedInSavedEmailId(userLoggedinEmailId));
            } else {
                console.log(true);

            }
            // Optionally refetch data here
        },
    });



    const loginForm = (e: any) => {
        e.preventDefault()

    }
    //   }

    return (
        <div>
            <ChangeLogInFormButtons/>
            <form onSubmit={loginForm}>
                <h3>Admin Login In Form</h3>
                <input type="text" placeholder="EmailId" onChange={(e) => dispatch(setUserLoggedInEmailId(e.target.value))} />
                <input type="password" placeholder="password" onChange={(e) => dispatch(setUserLoggedInEmailPassword(e.target.value))} />
                <button onClick={() => {
                    {
                        checkUserLoggedInAuth({
                            variables: {
                                userLoginParameters: {
                                    emailId: userLoggedinEmailId,
                                    password: userLoggedInEmailPassword
                                }
                            }
                        })
                    }
                }}>Login</button>
            </form>
        </div>
    )
}

export default LoginAdmin;