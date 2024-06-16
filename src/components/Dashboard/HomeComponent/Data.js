// import { useEffect, useState } from "react"
// import { useAppDispatch, useAppSelector } from "../../../ReduxHooks"
// import { setChartData } from "../../../ReduxSlicers/ChartsDetailsSlicer"


// export type chartDataProps = {
//   labels: string[] | undefined,
//   datasets: datasetsProps[]
// }

// export type datasetsProps = {
//   label: string,
//   data: number[],
//   backgroundColor?: string[],
//   borderWidth: number
// }

// const maleCount = useAppSelector((state) => state.ChartsDetailsSlicer.maleCount)
// const femaleCount = useAppSelector((state) => state.ChartsDetailsSlicer.femaleCount)

// const data = {
//   labels: ['Red', 'Orange', 'Blue', "Blue", "Blue"],
//   // backgroundColor:"transparent",
//   // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
//   datasets: [
//     {
//       label: 'Popularity of colours',
//       data: [maleCount, femaleCount, 126, 160, 200],
//       backgroundColor: ['rgba(0, 64, 255, 0.488)', 'rgba(0, 64, 255, 0.488)', 'rgba(0, 64, 255, 0.488)', 'rgba(0, 64, 255, 0.488)', 'rgba(0, 64, 255, 0.488)'],
//       borderWidth: 2,

//     },
//   ]
// }

// function Data() {

//   useEffect(() => {
//     console.log(data)
//     Dispatch(setChartData(data))
//     console.log(chartData)
//   })

//   const chartData = useAppSelector((state) => state.ChartsDetailsSlicer.chartData)

//   const Dispatch = useAppDispatch()
//   return (
//     <div></div>
//   )

//   // return data;

// }

// export default Data;