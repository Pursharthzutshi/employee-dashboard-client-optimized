import { createSlice } from "@reduxjs/toolkit"

type initialStateProps = {
    employeeName: String,
    employeeEmailId: [String],
    employeeTaskDesc: String,
    employeeDeadLine: String
}

const initialState:initialStateProps = {
    employeeName: "",
    employeeEmailId: [""],
    employeeTaskDesc: "",
    employeeDeadLine: ""

}

export const AddEmployeesTaskSlicer = createSlice({
    name: "AddEmployeesTaskSlicer",
    initialState,
    reducers: {
        setEmployeeName: (state, action) => {
            state.employeeName = action.payload;
        },
        SetEmployeeEmailId: (state, action) => {
            state.employeeEmailId = action.payload;
        },
        setEmployeeTaskDesc: (state, action) => {
            state.employeeTaskDesc = action.payload;

        },
        setEmployeeDeadLine: (state, action) => {
            state.employeeDeadLine = action.payload;

        },
    }
})

export const { setEmployeeName, SetEmployeeEmailId, setEmployeeTaskDesc, setEmployeeDeadLine } = AddEmployeesTaskSlicer.actions;

export default AddEmployeesTaskSlicer.reducer