import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../../ReduxSlicers/SearchFilterSilcer";
import { useAppSelector } from "../../../ReduxHooks";
import { EmployeesAccountDataProps } from "../../../Types/ShowAllEmployeesComponentTypes";
import NavBar from "../../NavBarComponent/NavBar";


import "../ShowAllEmployeesComponent/ShowAllEmployees.css"

function ShowAllEmployees() {

    const searchFilter = useAppSelector((state) => state.SearchFilterSilcer.SearchFilter)

    const show_all_employees_data_query = gql`
         query fetchemployeesDataQuery{
            showAllEmployee {
            name
            emailId
   }
}`

    const Dispatch = useDispatch()
    const { data: ShowAllEmployeesData, loading } = useQuery(show_all_employees_data_query, {
        onCompleted: (data) => {
            console.log(data)
        }
    }
    );

    useEffect(() => {
        console.log(ShowAllEmployeesData)
    })
    const adminStatus = useAppSelector((state) => state.LocalStorageSlicer.adminStatus)

    if (loading) return <p>Loading...</p>

    return (
        <div className="show-all-employees-component">

            <NavBar />
            {/* <input  type="search" /> */}
            <h3>All Employees</h3>
            <input onChange={(e) => Dispatch(setSearchFilter(e.target.value))} className="search-employees-input" placeholder="Search Employees" type="text" />
            <div className="employees-details-container">
                {
                    ShowAllEmployeesData.showAllEmployee.filter((filteredEmployeesAccountData: EmployeesAccountDataProps) => {

                        if (filteredEmployeesAccountData.name.toLowerCase().includes(searchFilter.toLowerCase())) {
                            console.log(filteredEmployeesAccountData)
                            return filteredEmployeesAccountData;
                        } else if (searchFilter === "") {
                            return filteredEmployeesAccountData;
                        }
                    }).map((EmployeesAccountData: EmployeesAccountDataProps) => {
                        return (
                            <div className="employees-details-div" >
                                <strong>Name:</strong><p>{EmployeesAccountData.name}</p>
                                <strong>Email ID:</strong><p className="email-id">{EmployeesAccountData.emailId}</p>
                                {adminStatus ? <button className="employees-details-button">Assign Employee of the month</button> : null}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShowAllEmployees;