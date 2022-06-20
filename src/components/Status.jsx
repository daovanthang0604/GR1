import React from "react";
import { PlusIcon } from "@heroicons/react/outline";
import User1 from "./../assets/Users/1.jpg";
import User2 from "./../assets/Users/2.jpg";
import User3 from "./../assets/Users/3.jpg";
const Status = () => {
  return (
    <section className="pt-8">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl font-semibold">Project Name</span>
        </div>
        <div className="flex space-x-16">
          <a className="flex space-x-4 border-2 border-dashed px-6 py-3 rounded-2xl">
            <PlusIcon className="w-6 h-6" />
            <span>Invite</span>
          </a>
          <div className="flex items-center">
            <img
              src={User1}
              alt=""
              className="w-8 h-8 rounded-full border-white border"
            />
            <img
              src={User2}
              alt=""
              className="w-8 h-8 rounded-full translate-x-[-0.75rem] border-white border"
            />
            <img
              src={User3}
              alt=""
              className="w-8 h-8 rounded-full translate-x-[-1.5rem] border-white border"
            />
            <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
              +15
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
