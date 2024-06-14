import { createSlice } from "@reduxjs/toolkit"

const initialState = {
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