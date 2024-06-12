import React, { useEffect } from "react";
import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import { gql, useMutation, useQuery } from "@apollo/client";


function ShowAllEmployees() {

    const show_all_employees_data_query = gql`
 query qd{
  showAllEmployee {
    emailId
  }
}`

    const { data: ShowAllEmployeesData } = useQuery(show_all_employees_data_query);

    useEffect(()=>{
        console.log(ShowAllEmployeesData)
    })

    return (
        <div>
            {/* {
                ShowAllEmployeesData.map((val: any) => {
                    return (
                        <div>
                            <p>{val.emailId}</p>
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default ShowAllEmployees;