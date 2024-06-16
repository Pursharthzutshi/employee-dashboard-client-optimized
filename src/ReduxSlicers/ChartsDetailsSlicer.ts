import { createSlice } from "@reduxjs/toolkit"

type genderTypeCountProps = {
    count: number
    maleCount: number
    femaleCount: number
    othersCount: number
    chartData:[]
}

const initialState: genderTypeCountProps = {
    count: 0,
    maleCount: 0,
    femaleCount: 0,
    othersCount: 0,
    chartData:[]
}

export const ChangeSignUpFormSlicer = createSlice({
    name: "genderTypeCountPropsSlicer",
    initialState,
    reducers: {
        setGenderTypeCount: (state, action) => {



            if (action.payload.genderType === "male") {
                state.maleCount = state.maleCount + 1
            }

            else if (action.payload.genderType === "female") {
                state.femaleCount = state.femaleCount + 1
            }
            else if (action.payload.genderType === "others") {
                state.othersCount = state.othersCount + 1
            }



        },
        setCount: (state, action) => {
            state.count = action.payload;

        },
        resetCounts: (state) => {
            state.maleCount = 0;
            state.femaleCount = 0;
            state.othersCount = 0;
            state.count = 0;
          },

          setChartData:(state,action)=>{
            console.log(action.payload)
            state.chartData = action.payload
          }
    }
})

export const { setGenderTypeCount, setCount,resetCounts,setChartData } = ChangeSignUpFormSlicer.actions;

export default ChangeSignUpFormSlicer.reducer