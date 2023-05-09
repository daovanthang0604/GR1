import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Bar } from 'react-chartjs-2';
import {format} from 'date-fns'
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
  const day = new Date();
  const labels = [];
  for (let i=3;i>0;i--){
    const date = new Date();
    date.setDate(day.getDate() - i);
    const formattedDate = format(date, 'dd MMM')
    labels.push(formattedDate)
  }
  labels.push('Today');
  for (let i=1;i<=3;i++){
    const date = new Date();
    date.setDate(day.getDate() + i);
    const formattedDate = format(date, 'dd MMM')
    labels.push(formattedDate)
  }
  console.log(day.getDate() - 1)
const data = {
  labels: labels,
  datasets: [
    {
      label: 'Tasks',
      data: [12, 19, 3, 5, 24, 18, 7],
      backgroundColor: '#1bd3fc',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderRadius: Number.MAX_VALUE,
      borderSkipped: false,
      barThickness: 22,
      borderWidth: 1,
    },
  ],
};

const options = {
    maintainAspectRatio: false,
    scales: {
        x: {
            ticks: {
              color: "#1bd3fc",
              beginAtZero: true,
              min: 0,
            },
            grid: {
              display: false, // Hide x grid
            },
        },
        y: {
            ticks: {
              color: "#1bd3fc",
              beginAtZero: true,
              min: 0,
              stepSize: 8,
            },
            grid: {
              display: false, // Hide y grid
            },
            max: 32,
          }

    },
    plugins: {
      legend: {
        position: 'top',
        color: '#1bd3fc',
      },
      title: {
        display: true,
        text: 'Activity',
        position: 'top',
        align: 'start',
        color: '#1bd3fc',
        font : {
          size: 24,
        },
      },
    },
  };


const Barchart = () => {
  return (
    <div>
      <Bar data={data}  options={options} width={600} height={300}/>
    </div>
  );
};

export default Barchart