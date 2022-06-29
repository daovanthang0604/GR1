import React from "react";
import UserImg from "./../assets/user.jpg";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";
import { users } from "./../data";
import { format, getDaysInMonth } from "date-fns";
const Calendar = () => {
  // get today date
  const dt = new Date();
  const day = dt.getDate();
  const month = dt.getMonth();
  const year = dt.getFullYear();
  console.log(day, month, year);
  const daysInMonth = getDaysInMonth(new Date(year, month));
  console.log(format(new Date(year, month), "LLLL"));
  console.log(daysInMonth);
  const days = [];
  for (let i = 1; i <= daysInMonth; i++) days.push(i);
  return (
    <section className="pt-8">
      {/* current month and year */}
      <div className="flex items-center space-x-4">
        <span className="text-xl font-semibold ">{`${format(
          new Date(year, month),
          "LLLL"
        )} ${day}`}</span>
        <div className="flex justify-around items-center space-x-2">
          <ChevronLeftIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
          <ChevronRightIcon className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      </div>
      {/* calendar */}
      <div className="pt-8 flex space-x-4 overflow-hidden">
        <div className="pt-8 space-y-4">
          {users.map((user) => {
            const { id, name, image, job } = user;
            return (
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
            );
          })}
        </div>
        <div className="grid grid-flow-col auto-cols-auto overflow-x-scroll snap-x scrollbar">
          {days.map((day) => (
            <div className="w-max px-8  border-x border-solid border-gray-100">{`${format(
              new Date(year, month, day),
              "EEEEE d"
            )}`}</div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Calendar;
