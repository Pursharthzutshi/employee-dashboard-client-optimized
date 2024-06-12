import React, { useEffect } from "react";
import "./SignUpAdmin.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck } from "../../../ReduxSlicers/SignUpSlicer";
import { redirect, useNavigate } from "react-router-dom";
import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";

const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
name,
emailId,
password
}
}
`

function SignupAdmin() {

  const userName = useAppSelector((state) => state.SignUpSlicer.userName)
  const userEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const userEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const userEmailPasswordRecheck = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)

  const dispatch = useAppDispatch();

  const navigate = useNavigate()


  const signUpForm = (e: any) => {
    e.preventDefault()
    navigate("/")
  }

  const [userSignUp, { loading }] = useMutation(signUpquery);
  useEffect(() => {
    const res = userSignUp
    console.log(res)
  })

  return (
    <div>
      <ChangeSignUpFormButtons/>
      <div className="signup-container">

        <div className="signup-box">
          <h3>Sign Up Admin</h3>

          <form onSubmit={signUpForm} className="signup-form">

            <input type="text" placeholder="Admin Name" onChange={(e) => dispatch(setUserName(e.target.value))} />
            <input type="text" placeholder="Admin EmailId" onChange={(e) => dispatch(setUserEmailId(e.target.value))} />
            <input type="password" placeholder="Admin Password" onChange={(e) => dispatch(setEmailPassword(e.target.value))} />
            <input type="password" placeholder="Retype Password" onChange={(e) => dispatch(setEmailPasswordRecheck(e.target.value))} />

            <button type="submit" onClick={() => {
              userSignUp({
                variables: {
                  userSignUpParameters: {
                    name: userName,
                    emailId: userEmailId,
                    password: userEmailPassword
                  },
                },
              })
            }}>Sign Up</button>
            {/* {
              d
            } */}
          </form>
        </div>

      </div>

    </div>
  )
}

export default SignupAdmin;