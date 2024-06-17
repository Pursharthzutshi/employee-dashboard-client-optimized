import React from "react";
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../../../../ReduxHooks";
import { Bar, Line } from "react-chartjs-2";

export type chartDataProps = {
  labels: string[] | undefined,
  datasets: datasetsProps[]
}

export type datasetsProps = {
  label: string,
  data: number[],
  backgroundColor?: string[],
  borderWidth: number
}
function GenderTypeChart() {


  const maleCount = useAppSelector((state) => state.ChartsDetailsSlicer.maleCount)
  const femaleCount = useAppSelector((state) => state.ChartsDetailsSlicer.femaleCount)
  const othersCount = useAppSelector((state) => state.ChartsDetailsSlicer.othersCount)


  const chartData = useAppSelector((state) => state.ChartsDetailsSlicer.chartData)


  const data = {
    labels: ["Total Employees", "Male", "Female", "Others"],
    datasets: [
      {
        label: 'NUMBER OF EMPLOYEES',
        data: [maleCount + femaleCount + othersCount, maleCount, femaleCount, othersCount],
        backgroundColor: ['rgb(0, 113, 212)', 'rgb(0, 85, 170)', "rgb(0 142 184)"],
      },


    ]
  }

  const options = {

    scales: {
      x: {
        display: false
      },
      y: {
        display: false

      },
      // x: {
      //   grid: {
      //     display: false
      //   },

      // },
      //   xAxes: [{
      //     angleLines: {
      //       display: false
      //     }
      //   }]
      // },
    }
  }

  return (
    <div className="bar-chart-div">
      {
        chartData && <Bar className="doughnut-chart" options={options} data={data} />
      }
    </div>
  )


}

export default GenderTypeChart;