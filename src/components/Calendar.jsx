import React, {useState} from "react";
import UserImg from "./../assets/user.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { users,tasks } from "./../data";
import { format, getDaysInMonth } from "date-fns";
const Calendar = () => {
  // get today date
  const dt = new Date();
  const [day,setDay] = useState(dt.getDate());
  const [month,setMonth] = useState(dt.getMonth());
  const [year,setYear] = useState(dt.getFullYear());
  console.log(day, month, year);
  const daysInMonth = getDaysInMonth(new Date(year, month));
  console.log(format(new Date(year, month), "LLLL"));
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  const colors = ['sun', 'accent', 'pool', 'tertiary']
  return (
    <section className="pt-8 overflow-hidden flex flex-col">
      {/* current month and year */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold ">{`${format(
          new Date(year, month),
          "MMMM"
        )} ${year}`}</span>
        <div className="flex justify-around items-center space-x-2">
          <ChevronLeftIcon className="w-4 h-4 text-gray-400 cursor-pointer" onClick={()=>setMonth(month-1)}/>
          <ChevronRightIcon className="w-4 h-4 text-gray-400 cursor-pointer" onClick={()=>setMonth(month+1)}/>
        </div>
      </div>
      {/* calendar */}
      <div className="pt-8 flex flex-col space-x-4 overflow-x-scroll overflow-y-scroll snap-x scrollbar">
        <div className="pt-8 space-y-4">
        <div className="grid grid-flow-col auto-cols-auto h-12 ml-64">
          {days.map((day) => (
            <div className="w-24 px-8  border-x border-solid border-transparent whitespace-nowrap">
              <span>{`${format(
              new Date(year, month, day),
              "EEEEE d"
            )}`}</span>  
            </div>
          ))}
        </div>
          {users.map((user,index) => {
            let randColor = colors[Math.floor(Math.random()*colors.length)];
            let misson = [];
            let startDate, endDate = null;
            const { id, name, image, job } = user;
            const curTask = tasks.find(task=>task.id == id);
            console.log(curTask);
            if(curTask) 
            {misson = curTask.misson
             startDate = misson[0].startDate
             endDate = misson[0].endDate
            }
            const result1 = new Date(startDate).getDate();
            const result2 = new Date(endDate).getDate();
            console.log(result1);
            
            return (
              <div className="grid grid-flow-col auto-rows-auto">

              <div
                className="flex space-x-4 items-center border border-solid border-slate-200 py-2 px-8 rounded-xl w-64"
                key={id}
              >
                <img
                  src={image}
                  alt="user profile"
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <h5 className="font-semibold">{name}</h5>
                  <span className="font-normal text-gray-400">{job}</span>
                </div>
              </div>
              {days.map((day)=><div key={day} className={`w-24 bg-navi flex justify-center items-center relative after:h-[125%] ${index == users.length-1 && ("after:h-[100%]")} after:absolute after:w-full after:border-x after:border-solid after:border-slate-200 tester`}>
                {misson.map(mis=>{
                  let numberDate = new Date(mis.endDate).getDate() - new Date(mis.startDate).getDate() + 1;
                  console.log( new Date(mis.endDate).getDate() - new Date(mis.startDate).getDate() + 1)
                  // if(new Date(mis.startDate).getDate() == day && new Date(mis.endDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-l-2xl rounded-r-2xl" ></div>
                  // if(new Date(mis.startDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-l-2xl" ></div>
                  // if(new Date(mis.endDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-r-2xl" ></div>
                  console.log(month)
                  if(new Date(mis.startDate).getDate() <= day && day <= new Date(mis.endDate).getDate() && month == new Date(mis.startDate).getMonth()) return <div className={`w-full h-3/5 bg-${randColor} z-10 flex items-center justify-center whitespace-nowrap overflow-x-visible ${new Date(mis.startDate).getDate() == day && ("rounded-l-2xl z-20")} ${new Date(mis.endDate).getDate() == day && ("rounded-r-2xl")} text-white relative`}> <span className={`absolute top-2/4 translate-y-[-50%] left-5 w-[calc(96px*0.8*${numberDate})] overflow-hidden text-ellipsis`}>{(new Date(mis.startDate).getDate() == day) && mis.name}</span></div>
                })}
              </div>)}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
