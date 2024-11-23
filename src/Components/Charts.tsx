import React, { useContext, useEffect, useState } from 'react'
import Chart from "chart.js/auto";
import { ArcElement, CategoryScale } from "chart.js";
import { Line, Pie } from "react-chartjs-2";
import { ExpenseContext } from '../Context/AppContext';
import { Category } from '@mui/icons-material';

export const Data = [
    {
      id: 1,
      year: 2016,
      userGain: 80000,
      userLost: 823
    },
    {
      id: 2,
      year: 2017,
      userGain: 45677,
      userLost: 345
    },
    {
      id: 3,
      year: 2018,
      userGain: 78888,
      userLost: 555
    },
    {
      id: 4,
      year: 2019,
      userGain: 90000,
      userLost: 4555
    },
    {
      id: 5,
      year: 2020,
      userGain: 4300,
      userLost: 234
    }
  ];

  interface Chartdataset{

    label:string,
    data:number[],
    backgroundColor:string[],
    borderWidth:number
  }
  interface ChartDataType{
    labels:string[],
    datasets:Chartdataset[]
 }
 interface LineDataset{
    label:string,
    data:number[],
    fill:boolean,
    borderColor:string,
    backgroundColor:string,
    tension:number
 }
 interface LinedataType{

    labels:string[],
    datasets:LineDataset[]
 }
const Charts = () => {
    Chart.register(ArcElement)
    const [categoryWiseData,setCategoryWiseData] = useState<Record<string,number>>({})
    const [chartData, setChartData] = useState<ChartDataType>(
        {
            labels:[],
            datasets: [
                {
                  label: 'Expenses by Category',
                  data: [],
                  backgroundColor: [
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                    'rgba(255, 255, 255, 0.6)',
                  ],
                  borderWidth: 1,
                }
            ]
    }
    )
    const [lineData,setLineData] = useState<LinedataType>(
        {
            labels: [],
            datasets: [{
              label: 'Expenses by Category',
              data: [],
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              backgroundColor:'rgb(75, 192, 192,.6)',
              tension: 0.1
            }]
          }
    )
    const context = useContext(ExpenseContext);
    if(!context){
        throw new Error("New Error");
    }
    const {expenses} = context;
    
    useEffect(() => {

        const categorywiseSumAmount = expenses.reduce<Record<string,number>>((resultObject, {category,amount}) => {

            resultObject[category] = (resultObject[category]? resultObject[category]:0) + amount
            return resultObject
        },{})

        setCategoryWiseData(categorywiseSumAmount)
        
       
        setChartData(
            {
                
                labels:Object.keys(categorywiseSumAmount),
                datasets: [
                    {
                      label: 'Expenses by Category',
                      data: Object.values(categorywiseSumAmount),
                      backgroundColor: [
                        'rgba( 86, 101, 115,0.8 )',
                        'rgba( 39, 55, 70, 0.8 )',
                        'rgba(28, 40, 51, 0.8)',
                      ],
                      borderWidth: 1,
                    }
                ]
        }
        )
        setLineData(
            {
                labels: Object.keys(categorywiseSumAmount),
                datasets: [{
                  label: 'Expenses by Category',
                  data: Object.values(categorywiseSumAmount),
                  fill: true,
                  borderColor: 'rgba(28, 40, 51, 0.8)',
                  backgroundColor:'rgb(128, 139, 150,.4)',
                  tension: 0.1
                }]
              }
        )
        
    },[expenses])
    
    
    console.log(categoryWiseData)
    console.log(chartData)

    

  return (
    
    expenses.length>0?<div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Pie Chart</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "Expenses across all categories"
            }
          }
        }}
      />
      <Line data={lineData}/>
    </div>:<></>
  )
}

export default Charts
