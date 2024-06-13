import React, { useEffect } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import NavBar from "../../NavBarComponent/NavBar";


import "../ShowAllEmployeesComponent/ShowAllEmployees.css"

function ShowAllEmployees() {

    const show_all_employees_data_query = gql`
 query qd{
  showAllEmployee {
    name
    emailId
  }
}`

    const { data: ShowAllEmployeesData, loading } = useQuery(show_all_employees_data_query, {
        onCompleted: (data) => {
            console.log(data)
        }
    }
    );

    useEffect(() => {
        console.log(ShowAllEmployeesData)
    })

    if (loading) return <p>Loading...</p>

    return (
        <div>

            <NavBar />
            <div className="employees-details-container">
                {
                    ShowAllEmployeesData.showAllEmployee.map((val: any) => {
                        return (
                            <div className="employees-details-div" >
                                <strong>Name:</strong><p>{val.name}</p>
                                <strong>Email ID:</strong><p className="email-id">{val.emailId}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShowAllEmployees;