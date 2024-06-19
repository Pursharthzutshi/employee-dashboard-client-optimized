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
import { setCreateEmployeeNewAccountStatus } from "../../../ReduxSlicers/createEmployeeNewAccountStatusSlicer";
import EmployeeStatus from "./EmployeeStatusComponent/EmployeeStatus";
import CheckInStatus from "./EmployeeStatusComponent/CheckInStatusComponent/CheckInStatus";
import GenderTypeChart from "./HomeCharts/GenderTypeChart/GenderTypeChart";
import DepartmentChart from "./HomeCharts/DepartmentChart/DepartmentChart";
import { setDepartment } from "../../../ReduxSlicers/SignUpSlicer";
import CardsDetails from "./CardsDetailsComponent/CardsDetails";
import EmployeeOfTheMonth from "./EmployeeOfTheMonthComponent/EmployeeOfTheMonth";

import image from "../../RegisterComponent/images/employee.png"
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
    const createEmployeeNewAccountStatus = useAppSelector((state) => state.createEmployeeNewAccountStatusSlicer.createEmployeeNewAccountStatus);

    const Dispatch = useAppDispatch()


    useEffect(() => {

        if (createEmployeeNewAccountStatus === true) {
            Dispatch(resetCounts());
            Dispatch(resetDepartmentCounts());
            Dispatch(setCreateEmployeeNewAccountStatus(false))
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

            <div className="div">
                <div className="div-row">
                    <img src={image} />
                    <h3>Welcome Back Admin</h3>
                </div>
                <div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris lobortis accumsan elementum. Ut non fringilla tellus, vel iaculis orci. Vestibulum tristique finibus arcu id accumsan. Ut nec nisi vitae nulla posuere faucibus. Aliquam quis dui sit amet neque vestibulum lobortis. Curabitur lobortis nec augue ac euismod. Curabitur fermentum, tellus sed cursus ultrices, metus massa rutrum enim, at pretium mi lacus sed nulla. Sed sed ante risus.</p>
                </div>
            </div>

            <CardsDetails />
            <div className="chart-div-container">

                <GenderTypeChart />
                <EmployeeOfTheMonth />
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

