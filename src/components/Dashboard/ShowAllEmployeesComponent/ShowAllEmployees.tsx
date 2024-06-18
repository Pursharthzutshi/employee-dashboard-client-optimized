import React, { useEffect } from "react";
import { gql, useLazyQuery, useMutation, useQuery } from "@apollo/client";
import NavBar from "../../NavBarComponent/NavBar";


import "../ShowAllEmployeesComponent/ShowAllEmployees.css"
import { useDispatch } from "react-redux";
import { setSearchFilter } from "../../../ReduxSlicers/SearchFilterSilcer";
import { useAppSelector } from "../../../ReduxHooks";

function ShowAllEmployees() {

    const searchFilter = useAppSelector((state) => state.SearchFilterSilcer.SearchFilter)

    const show_all_employees_data_query = gql`
 query qd{
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
                    ShowAllEmployeesData.showAllEmployee.filter((val: any) => {

                        if (val.name.toLowerCase().includes(searchFilter.toLowerCase())) {
                            console.log(val)
                            return val;
                        } else if (searchFilter === "") {
                            return val;
                        }
                    }).map((val: any) => {
                        return (
                            <div className="employees-details-div" >
                                <strong>Name:</strong><p>{val.name}</p>
                                <strong>Email ID:</strong><p className="email-id">{val.emailId}</p>
                                {adminStatus ? <button className="employees-details-button">Assign Employee of the month</button>:null}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ShowAllEmployees;