import { createSlice } from "@reduxjs/toolkit"

type localStorageSlicerProps = {
    loggedInSavedEmailId:any
}

const initialState:localStorageSlicerProps = {
    loggedInSavedEmailId: "",
}

export const LocalStorageSlicer = createSlice({
    name: "LocalStorageSlicer",
    initialState,
    reducers: {
        setLoggedInSavedEmailId: (state, action) => {
            state.loggedInSavedEmailId = localStorage.setItem("loggedInEmailID",action.payload);
        },
   
    }
})

export const { setLoggedInSavedEmailId } = LocalStorageSlicer.actions;

export default LocalStorageSlicer.reducer