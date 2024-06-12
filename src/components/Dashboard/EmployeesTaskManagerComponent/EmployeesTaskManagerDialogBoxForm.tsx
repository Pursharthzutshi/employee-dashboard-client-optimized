import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
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


    const Dispatch = useAppDispatch();
    const addSelectedUser = (currentUsers: String) => {


        if (!selectedUsers.includes(currentUsers)) {

            const usersEmailIds = FetchUserData.fetchEmailUsersIds.find((val: any) => {
                if (val.emailId === currentUsers) {
                    const addEmployeesTask = setSelectedUsers((prevUser: any) => [...prevUser, currentUsers])
                    Dispatch(SetEmployeeEmailId(selectedUsers));
                    return addEmployeesTask;
                }
            })



        }
        // if(currentUsers == usersEmailIds)
        // setSelectedUsers((prevUser:any)=>[...prevUser,currentUsers])
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
        <div>
            <button className="close-dialog-box-icon" onClick={closeDialogBox}>Close</button>

            <input type="text" placeholder="name" onChange={(e: any) => { Dispatch(setEmployeeName(e.target.value)) }} />

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

            <h3>Selected People</h3>
            {
                selectedUsers.map((val: any) => {
                    return (
                        <div>
                            <p>{val}</p>
                        </div>
                    )
                })
            }
            <input type="text" placeholder="taskDesc" onChange={(e: any) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} />
            <input type="text" placeholder="deadLine" onChange={(e: any) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} />


        </div>
    )
}

export default EmployeesTaskManagerDialogBoxForm;