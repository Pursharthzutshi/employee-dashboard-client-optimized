import { createSlice } from "@reduxjs/toolkit"

type SignUpResponseSlicerProps = {
    signUpResponseStatus: Boolean
}

const initialState:SignUpResponseSlicerProps = {
    signUpResponseStatus: false
}

export const SignUpResponseSlicer = createSlice({
    name: "SignUpResponseSlicer",
    initialState,
    reducers: {
        setSignUpResponseStatus: (state, action) => {
            // console.log(action.payload)
            state.signUpResponseStatus = action.payload;
        },
    }
})

export const { setSignUpResponseStatus } = SignUpResponseSlicer.actions;

export default SignUpResponseSlicer.reducer