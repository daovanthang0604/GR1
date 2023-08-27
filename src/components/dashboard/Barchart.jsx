import React from 'react'
import { useSelector } from "react-redux"
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
  function areDatesEqualIgnoringTime(date1, date2) {
    const isSameYear = date1.getFullYear() === date2.getFullYear();
    const isSameMonth = date1.getMonth() === date2.getMonth();
    const isSameDate = date1.getDate() === date2.getDate();
  
    return isSameYear && isSameMonth && isSameDate;
  }

const Barchart = ({selectedActivityProject}) => {
  const { tasks } = useSelector((store) => store.task)
  //console.log(selectedActivityProject)
  const tasksInProject = tasks.filter(task=>task.projectId === selectedActivityProject?._id);
  console.log(tasksInProject)
  const day = new Date();
  console.log(day)
  const taskData = [];
  const labels = [];
  for (let i=6;i>0;i--){
    const date = new Date();
    date.setDate(day.getDate() - i);
    let taskCreateAt = tasksInProject.filter(task=>{
      return areDatesEqualIgnoringTime(new Date(task?.createAt), date)
    })
    taskData.push(taskCreateAt.length)
    const formattedDate = format(date, 'dd MMM')
    labels.push(formattedDate)
  }
  console.log(tasksInProject)
  let taskCreateAtToday = tasksInProject.filter(task => {
    console.log(task?.createAt)
    return areDatesEqualIgnoringTime(new Date(task?.createAt), day);
  });
  console.log(taskCreateAtToday)
  taskData.push(taskCreateAtToday.length)
  console.log(taskData)
  labels.push('Today');
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tasks',
        data: taskData,
        backgroundColor: '#1bd3fc',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderRadius: Number.MAX_VALUE,
        borderSkipped: false,
        barThickness: 22,
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className='w-[200px] h-[250px] lg:w-[350px] lg:h-[250px] xl:w-[600px] xl:h-[300px] '>
      <Bar data={data}  options={options}/>
    </div>
  );
};

export default Barchart