import "../HomeComponent/Home.css"
import { useEffect, useState } from "react";
import Dropdown from 'react-dropdown';
import DropDown from "../../utils/DropDown"
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

import { Bar, Line, Pie } from 'react-chartjs-2';
import { Link } from "react-router-dom";
import { FaPersonBooth, FaUser } from "react-icons/fa";
import NavBar from "../../NavBarComponent/NavBar";
import { gql, useLazyQuery, useQuery, useSubscription } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";
import { resetCounts, setCount, setGenderTypeCount } from "../../../ReduxSlicers/ChartsDetailsSlicer";
import { setSignUpResponseStatus } from "../../../ReduxSlicers/SignUpResponseSlicer";
import DataFile from "./DataFile";
import EmployeeStatus from "./EmployeeStatusComponent/EmployeeStatus";
import CheckInStatus from "./EmployeeStatusComponent/CheckInStatusComponent/CheckInStatus";

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
 }
}`

function Home() {


    const { data: genderType, refetch } = useQuery(show_all_employees_data_query);

    const count = useAppSelector((state) => state.ChartsDetailsSlicer.count)
    const signUpResponseStatus = useAppSelector((state) => state.SignUpResponseSlicer.signUpResponseStatus);



    const Dispatch = useAppDispatch()


    useEffect(() => {

        if (signUpResponseStatus === true) {
            Dispatch(resetCounts());
            Dispatch(setSignUpResponseStatus(false))
        }

        if (genderType && genderType.showAllEmployee) {


            if (count !== genderType.showAllEmployee.length) {
                genderType.showAllEmployee.map((val: any) => {
                    return Dispatch(setGenderTypeCount(val))
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
            <CheckInStatus/>

            <h3>Home</h3>
            <div className="chart-div-container">

                <DataFile />
                <DataFile />
            </div>
            <div className="chart-div-container">


                <DataFile />

                {/* <DataFile />
 */}

                <EmployeeStatus />
                {/* <iframe>

            </iframe> */}
            </div>

        </div>
    )
}

export default Home;

