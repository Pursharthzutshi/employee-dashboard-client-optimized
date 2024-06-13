import { createSlice } from "@reduxjs/toolkit"

type genderTypeCountProps = {
    maleCount: number
    femaleCount: number
    othersCount: number
}

const initialState: genderTypeCountProps = {
    maleCount: 0,
    femaleCount: 0,
    othersCount: 0,
}

export const ChangeSignUpFormSlicer = createSlice({
    name: "genderTypeCountPropsSlicer",
    initialState,
    reducers: {
        setGenderTypeCount: (state, action) => {

            console.log(action.payload)

            if (action.payload.genderType === "male") {
                state.maleCount = state.maleCount + 1
            }

           else if (action.payload.genderType === "female") {
                state.femaleCount = state.femaleCount + 1
            }
            else{
                state.othersCount = state.othersCount + 1
            }

console.log(state.maleCount)


       
        },
    }
})

export const { setGenderTypeCount } = ChangeSignUpFormSlicer.actions;

export default ChangeSignUpFormSlicer.reducer