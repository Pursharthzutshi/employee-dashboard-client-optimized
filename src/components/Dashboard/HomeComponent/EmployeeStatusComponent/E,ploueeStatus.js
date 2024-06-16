import React, { useEffect, useState } from "react";
import "./EmployeeStatus.css"
import { FaPen } from "react-icons/fa";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useAppSelector } from "../../../../ReduxHooks";

const fetch_employees_details_query = gql`
query employeeStatusQuery{
  fetchEmailUsersIds {
  uid
    name
    status
  }
}
`

function EmployeeStatus() {

    const checkInStatus = useAppSelector((state) => state.CheckInStatusSlicer.checkInStatus)



    const { data: showAllUsersDetailsAndStatus, loading, refetch } = useQuery(fetch_employees_details_query);

    useEffect(() => {
        // localStorage.setItem("checkInStatus", checkInStatus.toString())
        if (showAllUsersDetailsAndStatus) {

            console.log(showAllUsersDetailsAndStatus.fetchEmailUsersIds)
            refetch()
        }
    })
    if (loading) return <p>Loading...</p>;

    return (
        <div className="employee-status-container">
            <h4>Employee Status</h4>
            <input className="search" type="search" />
            <table className="employee-table-heading-content-div">

                <tr className="employee-table-heading-div">
                    <th>Name</th>
                    <th>Email Id</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                <tr className="employee-table-content-div">
                    <td>
                        <input type="checkbox" />
                    </td>


                    {
                        showAllUsersDetailsAndStatus?.fetchEmailUsersIds.map((val: any) => {
                            // console.log(val.status)
                            return (
                                <>
                                    <td>{val.name}</td>
                                    {
                                        val.status ? <td>true </td> : <td>false </td>
                                    }
                                </>
                            )
                        })
                    }
                    <td>
                        <FaPen type="checkbox" />
                    </td>

                </tr>

            </table>
        </div>
    )
}

export default EmployeeStatus;