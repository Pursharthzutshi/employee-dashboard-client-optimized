import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import "./EmployeesTaskManagerDialogBoxForm.css"
import Calendar from 'react-calendar';
import { FaCross, FaTimes } from "react-icons/fa";
import { setTaskAssign } from "../../../ReduxSlicers/ShowTaskAssignEmployeeInDialogBoxSlicer";

const showUsersEmailIdsQuery = gql`
query fetchEmailUsersIds{
  fetchEmailUsersIds {
  name  
  emailId
  }
}
`


function EmployeesTaskManagerDialogBoxForm() {

    const { data: FetchUserData, loading, error, refetch } = useQuery(showUsersEmailIdsQuery);


    const [selectedUsers, setSelectedUsers] = useState<any>([]);


    const taskAssignedToEmployee = useAppSelector((state) => state.ShowTaskAssignEmployeeInDialogBoxSlicer.taskAssigned)
    const Dispatch = useAppDispatch();

    const addSelectedUser = (currentUsers: String) => {


        if (!selectedUsers.includes(currentUsers)) {

            const usersEmailIds = FetchUserData.fetchEmailUsersIds.find((val: any) => {
                if (val.emailId === currentUsers) {
                    const addEmployeesTask = setSelectedUsers((prevUser: any) => [...prevUser, currentUsers])
                    Dispatch(SetEmployeeEmailId(selectedUsers));
                    Dispatch(setTaskAssign(true))
                    return addEmployeesTask;
                } 
            })



        }
        // if(currentUsers == usersEmailIds)
        // setSelectedUsers((prevUser:any)=>[...prevUser,currentUsers])
    }

    const removeSelectedUsers = (selectedEmailId:any)=>{
        const updatedSelectedUsers = selectedUsers.filter((val:any)=>{
            console.log(selectedEmailId)
            return val !== selectedEmailId;
        })

        setSelectedUsers(updatedSelectedUsers)
    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }



    useEffect(() => {
        console.log(selectedUsers)
    }, [selectedUsers])

    if (loading) return <p>Loading...</p>;


    return (
        <div className="employee-dialog-box-div">
            <div className="close-dialog-box-icon-div">
                <FaTimes className="close-dialog-box-icon" onClick={closeDialogBox}>Close</FaTimes>
            </div>
            <h3 className="add-new-task-heading">Add a New Task</h3>

            <input type="text" placeholder="Task Name" onChange={(e: any) => { Dispatch(setEmployeeName(e.target.value)) }} />

            <input onChange={(e: any) => addSelectedUser(e.target.value)} type="text" name="city" list="cityname" />

            <datalist id="cityname">
                <select>
                    {
                        FetchUserData.fetchEmailUsersIds.map((val: any) => {
                            return <option value={val.emailId}>
                                {val.name}
                            </option>
                        })
                    }

                </select>
            </datalist>

            {
                taskAssignedToEmployee && selectedUsers.length > 0  && <div>

                    <strong>Task Assigned to the Employee</strong>
                    {
                        selectedUsers.map((val: any) => {
                            return (
                                <div>
                                    <p>{val}</p>
                                    <FaTimes onClick={()=>removeSelectedUsers(val)}>Cancel</FaTimes>
                                </div>
                            )
                        })
                    }
                </div>
            }

            <input type="text" placeholder="Task Description" onChange={(e: any) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} />
            {/* <input type="text" placeholder="deadLine" onChange={(e: any) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} /> */}
            {/* 
//<input className="calendar" type="date"/> */}
            {/* <Calendar/> */}

        </div>
    )
}

export default EmployeesTaskManagerDialogBoxForm;