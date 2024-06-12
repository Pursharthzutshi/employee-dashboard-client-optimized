import React, { useEffect } from "react";
import "./Signup.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck } from "../../../ReduxSlicers/SignUpSlicer";
import { redirect, useNavigate } from "react-router-dom";

const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
name,
emailId,
password
}
}
`

function Signup() {

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
      <div className="signup-container">

        <div className="signup-box">
          <h3>Sign Up</h3>

          <form onSubmit={signUpForm} className="signup-form">

            <input type="text" placeholder="Name" onChange={(e) => dispatch(setUserName(e.target.value))} />
            <input type="text" placeholder="EmailId" onChange={(e) => dispatch(setUserEmailId(e.target.value))} />
            <input type="password" placeholder="Password" onChange={(e) => dispatch(setEmailPassword(e.target.value))} />
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

export default Signup;