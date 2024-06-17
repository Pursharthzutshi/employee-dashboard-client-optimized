import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { SetEmployeeEmailId, setAlreadyAddedEmployeeStatus, setEmployeeDeadLine, setEmployeeName, setEmployeeTaskDesc } from "../../../ReduxSlicers/AddEmployeesTaskSlicer";
import { gql, useQuery } from "@apollo/client";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import "./EmployeesTaskManagerDialogBoxForm.css"
import Calendar from 'react-calendar';
import { FaCross, FaTimes } from "react-icons/fa";
import 'react-calendar/dist/Calendar.css';

import { setTaskAssign } from "../../../ReduxSlicers/ShowTaskAssignEmployeeInDialogBoxSlicer";
type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];
const showUsersEmailIdsQuery = gql`
query fetchEmailUsersIds{
  fetchEmailUsersIds {
  name  
  emailId
  }
}
`


function EmployeesTaskManagerDialogBoxForm({type,color}:any) {
    // const [date, setDate] = useState<any>(new Date());
    // const [selectRange, setSelectRange] = useState<boolean>(false);

    // const [value, onChange] = useState<Value>(new Date());
    const [date, setDate] = useState(new Date());


    const { data: FetchUserData, loading, error, refetch } = useQuery(showUsersEmailIdsQuery);

    const alreadyAddedEmployeeStatus = useAppSelector((state) => state.AddEmployeesTaskSlicer.alreadyAddedEmployeeStatus)


    const [selectedUsers, setSelectedUsers] = useState<any>([]);


    const taskAssignedToEmployee = useAppSelector((state) => state.ShowTaskAssignEmployeeInDialogBoxSlicer.taskAssigned)
    const Dispatch = useAppDispatch();

    
    const onChange = (date:any) => {
        setDate(date);
      };

    const addSelectedUser = (currentUsers: String) => {

        if (!selectedUsers.includes(currentUsers)) {

            console.log(currentUsers)
            FetchUserData.fetchEmailUsersIds.find((val: any) => {
                if (val.emailId === currentUsers) {
                    setSelectedUsers((prevUser: any) => [...prevUser, currentUsers])
                    Dispatch(setTaskAssign(true))
                    Dispatch(SetEmployeeEmailId(selectedUsers));
                    return;
                }
            })
        } else {
            Dispatch(setAlreadyAddedEmployeeStatus(true));
        }
        console.log(selectedUsers)

        // Dispatch(SetEmployeeEmailId(selectedUsers));

        // if(currentUsers == usersEmailIds)
        // setSelectedUsers((prevUser:any)=>[...prevUser,currentUsers])
    }

    useEffect(() => {
        Dispatch(SetEmployeeEmailId(selectedUsers));

    })

    const removeSelectedUsers = (selectedEmailId: any) => {
        const updatedSelectedUsers = selectedUsers.filter((val: any) => {
            console.log(selectedEmailId)
            return val !== selectedEmailId;
        })
        console.log(selectedUsers)
        setSelectedUsers(updatedSelectedUsers)
    }

    const closeDialogBox = () => {
        Dispatch(setShowEmployeesDialogBox(false));
        Dispatch(setShowEmployeesEditDialogBox(false));
    }

    //    if (loading) return <ReactLoading type={type} color={color} height={667} width={375} />        ;

    if(loading) return <h3>Loading</h3>

    return (
        <div className="employee-dialog-box-div">

            <div className="close-dialog-box-icon-div" onClick={closeDialogBox}>
                <FaTimes className="close-dialog-box-icon" >Close</FaTimes>
            </div>

            <h3 className="add-new-task-heading">Edit a New Task</h3>

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
                taskAssignedToEmployee && selectedUsers.length > 0 && <div className="selected-employees-container">

                    <strong>Task Assigned to the Employee</strong>
                    {
                        selectedUsers.map((val: any) => {
                            // console.log(val)
                            return (
                                <div className="selected-employees-div">
                                    <p>{val}</p>
                                    <FaTimes className="selected-employees-cancel-icon" onClick={() => removeSelectedUsers(val)}></FaTimes>
                                </div>
                            )
                        })
                    }
                </div>
            }

            {
                alreadyAddedEmployeeStatus ? <h4 className="">Added Already</h4> : null
            }


            <input type="text" placeholder="Task Description" onChange={(e: any) => { Dispatch(setEmployeeTaskDesc(e.target.value)) }} />
            {/* <input type="text" placeholder="deadLine" onChange={(e: any) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} /> */}
            <input className="calendar" placeholder="deadLine" type="date" onChange={(e: any) => { Dispatch(setEmployeeDeadLine(e.target.value)) }} />
            {/* <Calendar tileDisabled={tileDisabled}/> */}
     {/* <input type="text"/> */}
            {/* <Calendar className="react-calendar"  onClickDay={onChange} value={value} /> */}
            {/* <Calendar showWeekNumbers onChange={onChange} value={date} /> */}


            {/* <Calendar
                date={date}
                setDate={setDate}
                selectRange={selectRange}
                setSelectRange={setSelectRange}
            /> */}
            {/* <Calendar
              value={date}
              onChange={(date) => setDate(date)}
              selectRange={selectRange}
              setSelectRange={setSelectRange}
            /> */}

        </div>
    )
}

export default EmployeesTaskManagerDialogBoxForm;