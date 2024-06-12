import React, { useEffect } from "react";
import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import NavBar from "../../NavBarComponent/NavBar";


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

            {
                ShowAllEmployeesData.showAllEmployee.map((val: any) => {
                    return (
                        <div>
                            <h4>Email ID:</h4><p>{val.emailId}</p>
                            <h4>Name:</h4><p>{val.name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ShowAllEmployees;