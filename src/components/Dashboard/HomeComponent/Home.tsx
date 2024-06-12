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


function Home() {

    const [chartData, setChartData] = useState<chartDataProps | null>(null)

    useEffect(() => {
        setChartData(data);
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