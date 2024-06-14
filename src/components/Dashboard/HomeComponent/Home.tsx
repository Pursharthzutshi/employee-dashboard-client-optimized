import "../HomeComponent/Home.css"
import { chartDataProps, data } from "./Data";
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

    const { data: genderType, refetch } = useQuery(show_all_employees_data_query, {
        // pollInterval: 1000, // Polling interval in milliseconds (e.g., every 5 seconds)
    });

    const [chartData, setChartData] = useState<chartDataProps | null>(null)

    // const[count,setCount] = useState(0);
    const Dispatch = useAppDispatch()

    const maleCount = useAppSelector((state) => state.ChartsDetailsSlicer.maleCount)
    const femaleCount = useAppSelector((state) => state.ChartsDetailsSlicer.femaleCount)

    const count = useAppSelector((state) => state.ChartsDetailsSlicer.count)
    const signUpResponseStatus = useAppSelector((state) => state.SignUpResponseSlicer.signUpResponseStatus);


    useEffect(() => {

        // console.log(signUpResponseStatus);

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
            // console.log(totalGenderTypeCounts)
            const totalGenderTypeCounts = genderType.showAllEmployee.length
            Dispatch(setCount(totalGenderTypeCounts))
            refetch()
        }
        // Dispatch(setSignUpResponseStatus(false))
        // console.log(signUpResponseStatus);


    }, [genderType])

    useEffect(() => {
        console.log("Total count", count)
        console.log("male count", maleCount)
        console.log("female count", femaleCount)
        // console.log(others)
    })

    return (
        <div className="dashboard">

            <NavBar />

            <h3>Dashboard</h3>
            <div className="chart-div-container">

                <div className="bar-chart-div">
                    {
                        chartData && <Bar className="doughnut-chart" data={chartData} />
                    }
                </div>
                <div className="bar-chart-div">
                    <select>
                        <option>Home</option>
                        <option>Home</option>
                        <option>Home</option>
                    </select>
                    {
                        chartData && <Line className="doughnut-chart" data={chartData} />
                    }
                </div>

            </div>
            <div className="chart-div-container">

                <div className="bar-chart-div">
                    {
                        chartData && <Pie className="doughnut-chart" data={chartData} />
                    }
                </div>
                <div className="bar-chart-div">
                    <select>
                        <option>Home</option>
                        <option>Home</option>
                        <option>Home</option>
                    </select>
                    {
                        chartData && <Line className="doughnut-chart" data={chartData} />
                    }
                </div>

            </div>

            {/* <h3 onClick={change} className="drop-down-label">Select Items</h3>

            <DropDown test={test}/>
 */}
        </div>
    )
}

export default Home;

