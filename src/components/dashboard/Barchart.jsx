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
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )
const data = {
  labels: ['17 Apr', '18 Apr', '19 Apr', 'Today', '21 Apr', '22 Apr', '23 Apr'],
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