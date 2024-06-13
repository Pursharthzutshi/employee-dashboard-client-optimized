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
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import { useAppDispatch, useAppSelector } from "../../../ReduxHooks";

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
query qd{
 showAllEmployee {
   genderType
 }
}`

function Home() {

    const {data:genderType} = useQuery(show_all_employees_data_query);

    const [chartData, setChartData] = useState<chartDataProps | null>(null)

    const [male,setMale] = useState(0);

    const [female,setFemale] = useState(0);

    const [others,setOthers] = useState(0);

    const Dispatch = useAppDispatch()

    const genderTypeCount = useAppSelector((state)=>state.ChartsDetailsSlicer.genderTypeCount)
    
    useEffect(() => {
        setChartData(data);
        let maleCount= 0
        let femaleCount= 0
        let others = 0;
        
        genderType.showAllEmployee.map((val:any)=>{
            console.log(val)
            
            if(val.genderTypeCount === "male"){
                maleCount++
            }

            if(val.genderTypeCount === "female"){
                femaleCount++
            }

            if(val.genderTypeCount === "others"){
                others
            }

        })
        setMale(maleCount)
        setFemale(femaleCount);
    console.log(male)
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