import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setChangeLoginForm, setChangeSignUpForm } from "../../../ReduxSlicers/ChangeSignUpFormSlicer";

function ChangeLogInFormButtons() {


    const Dispatch = useAppDispatch()

    const [showUserSignUpForm, setShowUserSignUpForm] = useState<boolean>(false);
    const [showAdminSignUpForm, setShowAdminSignUpForm] = useState<boolean>(false);

    const toggleSignUpForm = (signUpFormCategory: string) => {
        if (signUpFormCategory === "userSignUp") {
            // setShowUserSignUpForm(true)
            // setShowAdminSignUpForm(false)
            Dispatch(setChangeLoginForm(true));
        } else {
            // setShowUserSignUpForm(false)
            // setShowAdminSignUpForm(true)

            Dispatch(setChangeLoginForm(false));
        }
    }

    const categorySignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
    return (
        <div>
            <form onSubmit={categorySignUpForm}>
                <label>User Log In</label>
                <input name="login-radio" type="checkbox" value="userSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
                <label>Admin Log in</label>
                <input name="login-radio" type="checkbox" value="adminSignUp" onChange={(e: React.ChangeEvent<HTMLInputElement>) => { toggleSignUpForm(e.target.value) }} />
            </form>
            {/* {showUserSignUpForm && <SignupUsers/>}
            {showAdminSignUpForm && <SignupAdmin/>} */}
        </div>
    )
}

export default ChangeLogInFormButtons;