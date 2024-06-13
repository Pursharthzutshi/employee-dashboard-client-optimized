import React, { useEffect } from "react";
import "./SignupUsers.css"
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setUserName, setUserEmailId, setEmailPassword, setEmailPasswordRecheck, setGenderType } from "../../../ReduxSlicers/SignUpSlicer";
import { redirect, useNavigate } from "react-router-dom";
import ChangeSignUpFormButtons from "./ChangeSignUpFormButtons";
import { v4 as uuidv4 } from 'uuid';

const signUpquery = gql`
mutation create($userSignUpParameters: createUserSignUpInput!){
createUserSignUp(userSignUpParameters: $userSignUpParameters) {
name,
emailId,
password
}
}
`

function SignupUsers() {

  const userName = useAppSelector((state) => state.SignUpSlicer.userName)
  const userEmailId = useAppSelector((state) => state.SignUpSlicer.userEmailId)
  const userEmailPassword = useAppSelector((state) => state.SignUpSlicer.userEmailPassword)
  const userEmailPasswordRecheck = useAppSelector((state) => state.SignUpSlicer.userEmailPasswordRecheck)
  const genderType = useAppSelector((state) => state.SignUpSlicer.genderType)

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
          <h3>Sign Up Users</h3>

          <form onSubmit={signUpForm} className="signup-form">

            <input type="text" placeholder="Name" onChange={(e) => dispatch(setUserName(e.target.value))} />
            <input type="text" placeholder="EmailId" onChange={(e) => dispatch(setUserEmailId(e.target.value))} />
            <input type="password" placeholder="Password" onChange={(e) => dispatch(setEmailPassword(e.target.value))} />        
            <input type="category" placeholder="Retype Password" onChange={(e) => dispatch(setEmailPasswordRecheck(e.target.value))} />
            
            <div className="gender-cateogry-div">
              <input onChange={(e)=>dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="male" type="radio"/>
              <label>Male</label>
              <input onChange={(e)=>dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="female" type="radio"/>
              <label>Female</label>
              <input onChange={(e)=>dispatch(setGenderType(e.target.value))} className="gender-type" name="gender" value="others" type="radio"/>
              <label>Others</label>
            </div>
            <button type="submit" onClick={() => {
              userSignUp({
                variables: {
                  userSignUpParameters: {
                    uid:uuidv4(),
                    name: userName,
                    emailId: userEmailId,
                    password: userEmailPassword,
                    genderType:genderType
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

export default SignupUsers;