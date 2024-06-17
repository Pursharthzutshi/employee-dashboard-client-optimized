import "../HomeComponent/Home.css"
import { useEffect, useState } from "react";
// import Dropdown from 'react-dropdown';
import "../../../App.css"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement

} from 'chart.js';

import NavBar from "../../NavBarComponent/NavBar";
import { gql, useQuery, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { resetCounts, resetDepartmentCounts, setCount, setDepartmentCount, setGenderTypeCount } from "../../../ReduxSlicers/ChartsDetailsSlicer";
import { setSignUpResponseStatus } from "../../../ReduxSlicers/SignUpResponseSlicer";
import EmployeeStatus from "./EmployeeStatusComponent/EmployeeStatus";
import CheckInStatus from "./EmployeeStatusComponent/CheckInStatusComponent/CheckInStatus";
import GenderTypeChart from "./HomeCharts/GenderTypeChart/GenderTypeChart";
import DepartmentChart from "./HomeCharts/DepartmentChart/DepartmentChart";
import { setDepartment } from "../../../ReduxSlicers/SignUpSlicer";

// Register the components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const show_all_employees_data_query = gql`
query qd {
 showAllEmployee {
   genderType
   department
 }
}`

function Home() {


    const { data: genderType, refetch } = useQuery(show_all_employees_data_query);

    const count = useAppSelector((state) => state.ChartsDetailsSlicer.count)
    const departmentCount = useAppSelector((state) => state.ChartsDetailsSlicer.departmentCount)
    const signUpResponseStatus = useAppSelector((state) => state.SignUpResponseSlicer.signUpResponseStatus);

    const Dispatch = useAppDispatch()


    useEffect(() => {

        if (signUpResponseStatus === true) {
            Dispatch(resetCounts());
            Dispatch(resetDepartmentCounts());
            Dispatch(setSignUpResponseStatus(false))
        }

        if (genderType && genderType.showAllEmployee) {

            if (count !== genderType.showAllEmployee.length) {
                genderType.showAllEmployee.map((val: any) => {
                    return Dispatch(setGenderTypeCount(val))
                })
                genderType.showAllEmployee.map((val: any) => {
                    return Dispatch(setDepartmentCount(val))
                })
            }

            const totalGenderTypeCounts = genderType.showAllEmployee.length
            Dispatch(setCount(totalGenderTypeCounts))

            refetch()
        }

    }, [genderType])



    return (
        <div className="dashboard">


            <NavBar />
            <CheckInStatus />

            <h3>Home</h3>
            <div className="chart-div-container">

                <GenderTypeChart />
                <DepartmentChart />
            </div>
            <div className="chart-div-container">


                <EmployeeStatus />

            </div>

        </div>
    )
}

export default Home;

