
export type chartDataProps = {
    labels:string[] | undefined,
    datasets:datasetsProps[]
}

export type datasetsProps = {
  label:string ,
  data:number[],
  backgroundColor?:string[],
  borderWidth:number
}

export const data:chartDataProps = {
  labels: ['Red', 'Orange', 'Blue',"Blue","Blue"],
  // backgroundColor:"transparent",
  // datasets is an array of objects where each object represents a set of data to display corresponding to the labels above. for brevity, we'll keep it at one object
  datasets: [
      {
        label: 'Popularity of colours',
        data: [305, 103, 126, 160, 200],
        backgroundColor: ['rgba(0, 64, 255, 0.488)','rgba(0, 64, 255, 0.488)','rgba(0, 64, 255, 0.488)','rgba(0, 64, 255, 0.488)','rgba(0, 64, 255, 0.488)'],
        borderWidth: 2,

      },
  ]
}