import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    userName: "",
    userEmailId: "",
    userEmailPassword: "",
    userEmailPasswordRecheck: ""
    
}

export const SignUpSlicer = createSlice({
    name: "SignUpSlicer",
    initialState,
    reducers: {
        setUserName: (state, action) => {
            state.userName = action.payload;
        },
        setUserEmailId: (state, action) => {
            state.userEmailId = action.payload;
        },

        setEmailPassword: (state, action) => {
            state.userEmailPassword = action.payload;
        },
        setEmailPasswordRecheck: (state, action) => {
            state.userEmailPasswordRecheck = action.payload;
        },


    }
})
export const { setUserName, setUserEmailId, setEmailPassword,setEmailPasswordRecheck } = SignUpSlicer.actions;

export default SignUpSlicer.reducer