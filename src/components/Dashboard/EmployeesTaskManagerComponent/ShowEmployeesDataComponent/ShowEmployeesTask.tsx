import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import "../ShowEmployeesDataComponent/ShowEmployeesTask.css"
import EditEmployeesTaskDetailsDialogBox from "../EditEmployeesDataComponents/EditEmployeesTaskManagerDialogBox";
import { setShowEmployeesDialogBox, setShowEmployeesEditDialogBox } from "../../../../ReduxSlicers/ShowEmployeesDialogBoxSlicer";
import { useAppDispatch, useAppSelector } from "../../../../ReduxHooks";
import EditEmployeesTaskManagerDialogBox from "../EditEmployeesDataComponents/EditEmployeesTaskManagerDialogBox";
const fetch_employees_task_details_query = gql`
query fetchEmployeesDetails{
 fetchEmployeesTaskDetails{
 uid,
name,
emailId,
taskDesc,
deadLine
 }
}
`
const delete_employees_task_data = gql`
mutation dq($employeeUidParameter: deleteEmployeesTaskInput!){
  deleteEmployeesTask(employeeUidParameter: $employeeUidParameter) {
    emailId
  }
}
`


function ShowEmployeesTask() {

  const [selectedUpdateTaskFieldUid, setSelectedUpdateTaskFieldUid] = useState<string>("");

  const { data: employeesTaskData, loading } = useQuery(fetch_employees_task_details_query)

  const [editDialogBox, setEditDialogBox] = useState<Boolean>(false);

  const [deleteEmployeeTaskData] = useMutation(delete_employees_task_data,
    {
      refetchQueries: [{ query: fetch_employees_task_details_query }]

    }
  );


  const editdialogBox = useAppSelector((state) => state.ShowEmployeesDialogBoxSlicer.showEmployeesEditDialogBox)

  const Dispatch = useAppDispatch();


  const showEditDialogBox = (val: any) => {
    Dispatch(setShowEmployeesEditDialogBox(true));
    console.log(val)
    setSelectedUpdateTaskFieldUid(val)
  }

  useEffect(() => {
    console.log(employeesTaskData)
  })
  if (loading) return <p>Loading...</p>;

  return (
    <div className="employees-task-data-container">
      {
        employeesTaskData.fetchEmployeesTaskDetails.map((val: any) => {
          console.log(val)
          return (
            <div className="employees-task-data-div">
              {/* <p>{val.uid}</p> */}

              <h3>{val.name}</h3>
              <span>{val.taskDesc}</span>
              <p>{val.deadLine}</p>

              <span>Assinged to:{val.emailId}</span>

              <p className="emailid">{val.emailId}</p>

              <button className="employees-task-edit-dialog-box-button" onClick={() => showEditDialogBox(val.uid)}>Edit</button>
              <button className="employees-task-delete-button" onClick={() => {
                deleteEmployeeTaskData({
                  variables: {
                    employeeUidParameter: {
                      uid: val.uid
                    }
                  }
                })
              }}>Delete Task</button>

            </div>
          )
        })
      }

      {
        editdialogBox && <EditEmployeesTaskManagerDialogBox selectedUpdateTaskFieldUid={selectedUpdateTaskFieldUid} />
      }
    </div>
  )
}

export default ShowEmployeesTask;