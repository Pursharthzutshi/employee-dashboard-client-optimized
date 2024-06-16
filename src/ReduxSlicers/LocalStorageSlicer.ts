import { createSlice } from "@reduxjs/toolkit"

type localStorageSlicerProps = {
    // loggedInSavedUid: any
    adminStatus:any,
    loggedInSavedUid: any
    logOutStatus: any,
    showLogOutButtonElements: any

}

const initialState: localStorageSlicerProps = {
    adminStatus:false,
    loggedInSavedUid: localStorage.getItem("loggedInSavedUid"),
    logOutStatus: localStorage.getItem("logOutButton"),
    showLogOutButtonElements: localStorage.getItem("logOutButton"),

}

export const LocalStorageSlicer = createSlice({
    name: "LocalStorageSlicer",
    initialState,
    reducers: {

        setAdminStatus:(state,action)=>{
            state.adminStatus = action.payload
        },
        setLoggedInSavedUid: (state, action) => {
            console.log(state.adminStatus)
            state.loggedInSavedUid = action.payload;
            // state.adminStatus = true
            localStorage.setItem(state.adminStatus ? "adminLoggedInSavedUid":"loggedInSavedUid", action.payload);
        },

        setShowLogOutButtonElements: (state, action) => {
            state.showLogOutButtonElements = action.payload;
            localStorage.setItem("logOutButton", action.payload);
        },

        setLogOutStatus: (state, action) => {
            if(state.adminStatus === true){
                localStorage.removeItem("adminLoggedInSavedUid");
            }else{
                localStorage.removeItem("loggedInSavedUid");
            }
            localStorage.removeItem("logOutButton")
            state.logOutStatus = action.payload

        }
    }
})

export const { setLoggedInSavedUid, setShowLogOutButtonElements, setLogOutStatus,setAdminStatus } = LocalStorageSlicer.actions;

export default LocalStorageSlicer.reducer