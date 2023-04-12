import React, { useState, useEffect } from "react";
import UserImg from "./../assets/user.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
// import { tasks } from "./../data";
import { format, getDaysInMonth } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
import { setTask } from "../features/task/taskDetailSlice";
const Calendar = () => {
  const dispatch = useDispatch();
  const { tasks } = useSelector((store) => store.task);
  const {project} = useSelector((store)=> store.projectDetail)
  const {membersInProject} = useSelector((store)=> store.projectDetail)
  const [users, setUsers] = useState(membersInProject);
  const tasksInProject = tasks.filter(task=>task.projectId === project._id);
  console.log(tasksInProject)
  // get today date
  const dt = new Date();
  const [day, setDay] = useState(dt.getDate());
  const [month, setMonth] = useState(dt.getMonth());
  const [year, setYear] = useState(dt.getFullYear());
  // get number of days in a month
  const daysInMonth = getDaysInMonth(new Date(year, month));
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  // when user want to see previous month in calendar
  const handlePrevMonth = (curMonth) => {
    let updateMonth = curMonth - 1;
    if (updateMonth == -1) {
      setMonth(11);
      setYear(year - 1);
    } else setMonth(updateMonth);
  };
  const handleNextMonth = (curMonth) => {
    let updateMonth = curMonth + 1;
    if (updateMonth == 12) {
      setMonth(0);
      setYear(year + 1);
    } else setMonth(updateMonth);
  };
  return (
    <section className="pt-8 overflow-hidden flex flex-col">
      {/* current month and year */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold ">{`${format(
          new Date(year, month),
          "MMMM"
        )} ${year}`}</span>
        <div className="flex justify-around items-center space-x-2">
          <ChevronLeftIcon
            className="w-4 h-4 text-gray-400 cursor-pointer"
            onClick={() => handlePrevMonth(month)}
          />
          <ChevronRightIcon
            className="w-4 h-4 text-gray-400 cursor-pointer"
            onClick={() => handleNextMonth(month)}
          />
        </div>
      </div>
      {/* calendar */}
      <div className="pt-8 flex flex-col space-x-4 overflow-x-scroll overflow-y-scroll snap-x scrollbar">
        <div className="pt-8 space-y-4">
          <div className="grid grid-flow-col auto-cols-auto h-12 ml-64">
            {days.map((day) => (
              <div
                className="w-24 px-8  border-x border-solid border-transparent whitespace-nowrap"
                key={day}
              >
                <span
                  className={`${
                    day == dt.getDate() &&
                    month == dt.getMonth() &&
                    year == dt.getFullYear() &&
                    "text-ocean"
                  }`}
                >{`${format(new Date(year, month, day), "EEEEE d")}`}</span>
              </div>
            ))}
          </div>
          {/* get each user calendar */}
          {users.map((user, index) => {
            // set colors for each user
            let randColor = "";
            if (index % 4 == 1) randColor = "bg-pool";
            else if (index % 4 == 2) randColor = "bg-sun";
            else if (index % 4 == 3) randColor = "bg-tertiary";
            else if (index % 4 == 0) randColor = "bg-accent";
            let misson = [];
            let startDate,
              endDate = null;
            const { _id, fullName, image, job } = user;
            tasksInProject.map((task) => {
              if (task.userId == _id) misson.push(task);
            });
            console.log(misson);
            return (
              <div className="grid grid-flow-col auto-rows-auto">
                <div
                  className="flex space-x-4 items-center border border-solid border-slate-200 py-2 px-8 rounded-xl w-64"
                  key={_id}
                >
                  <img
                    src={image}
                    alt="user profile"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h5 className="font-semibold">{fullName}</h5>
                    <span className="font-normal text-gray-400">{job}</span>
                  </div>
                </div>
                {days.map((day) => (
                  <div
                    key={day}
                    className={`w-24 flex justify-center items-center relative after:h-[140%] ${
                      index == users.length - 1 && "after:h-[100%]"
                    } after:absolute after:w-full after:border-x after:border-solid after:border-slate-200 tester`}
                  >
                    {misson.map((mis) => {
                      let numberDate =
                        new Date(mis.endDate).getDate() -
                        new Date(mis.startDate).getDate() +
                        1;
                      let taskTextLength = 76.8 * numberDate;
                      // console.log(
                      //   new Date(mis.endDate).getDate() -
                      //     new Date(mis.startDate).getDate() +
                      //     1
                      // );
                      // if(new Date(mis.startDate).getDate() == day && new Date(mis.endDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-l-2xl rounded-r-2xl" ></div>
                      // if(new Date(mis.startDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-l-2xl" ></div>
                      // if(new Date(mis.endDate).getDate() == day) return <div className="w-full h-3/5 bg-accent z-10 rounded-r-2xl" ></div>
                      // console.log(month);
                      if (
                        new Date(mis.startDate).getDate() <= day &&
                        day <= new Date(mis.endDate).getDate() &&
                        month == new Date(mis.startDate).getMonth() &&
                        year == new Date(mis.startDate).getFullYear()
                      )
                        return (
                          <div
                            className={`w-full h-4/6 ${randColor} z-10 flex items-center justify-center whitespace-nowrap overflow-x-visible ${
                              new Date(mis.startDate).getDate() == day &&
                              "rounded-l-2xl z-20"
                            } ${
                              new Date(mis.endDate).getDate() == day &&
                              "rounded-r-2xl"
                            } text-white relative`}
                          >
                            {new Date(mis.startDate).getDate() == day && (
                              <span
                                className="w-2 h-2 bg-white cursor-pointer rounded-full absolute left-2 after:w-4 after:h-4 after:rounded-full after:border after:border-slate-200 after:absolute after:top-[-0.25rem] after:left-[-0.25rem]"
                                onClick={() => {
                                  dispatch(
                                    openModal({ modalId: "taskDetails" })
                                  );
                                  dispatch(setTask(mis));
                                }}
                              ></span>
                            )}
                            <span
                              className={`absolute top-2/4 translate-y-[-50%] left-6 w-[${taskTextLength}px] overflow-hidden text-ellipsis first-letter:capitalize`}
                            >
                              {new Date(mis.startDate).getDate() == day &&
                                mis.title}
                            </span>
                          </div>
                        );
                    })}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
