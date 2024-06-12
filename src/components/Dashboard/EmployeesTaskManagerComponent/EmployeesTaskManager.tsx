import React, { useEffect, useState } from "react";
import "../EmployeesTaskManagerComponent/EmployeesTaskManager.css"
import ShowEmployeesTask from "./ShowEmployeesDataComponent/ShowEmployeesTask";
import EmployeesTaskManagerDialogBox from "./AddEmployeesComponent/AddEmployeesTaskManagerDialogBox";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { setShowEmployeesDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import AddEmployeesTaskManagerDialogBox from "./AddEmployeesComponent/AddEmployeesTaskManagerDialogBox";
// import AddTaskkDialogBox from "./AddTaskDialogBox";

function EmployeesTaskManager() {

    // const loggedInSavedEmailId = useAppSelector((state) => state.LocalStorageSlicer.loggedInSavedEmailId)

    const dialogBox = useAppSelector((state) => state.ShowEmployeesDialogBoxSlicer.showEmployeesDialogBox)
    const Dispatch = useAppDispatch();

    const showDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(true));
    }

    useEffect(()=>{
        const val = localStorage.getItem('loggedInEmailID')
        console.log(val);
    })

    return (
        <div className="tasks-component">
            <h3>Employees Task</h3>
            <button onClick={showDialogBox}>Add Posts</button>
            {
                dialogBox && <AddEmployeesTaskManagerDialogBox />
            }


            <ShowEmployeesTask />

        </div>
    )
}

export default EmployeesTaskManager;