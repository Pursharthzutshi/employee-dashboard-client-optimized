import { createSlice } from "@reduxjs/toolkit"

type genderTypeCountProps = {
    count:number
    maleCount: number
    femaleCount: number
    othersCount: number
}

const initialState: genderTypeCountProps = {
    count:0,
    maleCount: 0,
    femaleCount: 0,
    othersCount: 0,
}

export const ChangeSignUpFormSlicer = createSlice({
    name: "genderTypeCountPropsSlicer",
    initialState,
    reducers: {
        setGenderTypeCount: (state, action) => {

            // console.log(action.payload)

            if (action.payload.genderType === "male") {
                state.maleCount = state.maleCount + 1
            }

            else if (action.payload.genderType === "female") {
                state.femaleCount = state.femaleCount + 1
            }
            else {
                state.othersCount = state.othersCount + 1
            }

            // console.log(state.maleCount)


        },
        setCount:(state,action)=>{
            state.count = action.payload;

        }
    }
})

export const { setGenderTypeCount,setCount } = ChangeSignUpFormSlicer.actions;

export default ChangeSignUpFormSlicer.reducer