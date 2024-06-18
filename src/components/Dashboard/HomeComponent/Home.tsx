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
import CardsDetails from "./CardsDetailsComponent/CardsDetails";

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


    const { data: employeesData, refetch } = useQuery(show_all_employees_data_query);

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

        if (employeesData && employeesData.showAllEmployee) {

            if (count !== employeesData.showAllEmployee.length) {
                employeesData.showAllEmployee.map((employeesDataList: any) => {
                    return Dispatch(setGenderTypeCount(employeesDataList))
                })
                employeesData.showAllEmployee.map((employeesDataList: any) => {
                    return Dispatch(setDepartmentCount(employeesDataList))
                })
            }

            const totalDataCount = employeesData.showAllEmployee.length
            Dispatch(setCount(totalDataCount))

            refetch()
        }

    }, [employeesData])



    return (
        <div className="dashboard">


            <NavBar />

            <CheckInStatus />

            <CardsDetails />
            <div className="chart-div-container">

                <GenderTypeChart />
                <div className="div">
                    <h3>Employee Of The Month</h3>
                </div>
                <DepartmentChart />

            </div>
            <br></br>
            <div className="chart-div-container">


                {/* <EmployeeStatus /> */}
                {/* <DepartmentChart /> */}

            </div>

        </div>
    )
}

export default Home;

