import React from "react";
import { PlusIcon } from "@heroicons/react/outline";
import User1 from "./../assets/Users/1.jpg";
import User2 from "./../assets/Users/2.jpg";
import User3 from "./../assets/Users/3.jpg";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { openModal } from "../features/modal/modalSlice";
const Status = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((store) => store.projectDetail);
  const { membersInProject } = useSelector((store) => store.projectDetail);
  const showedMember = membersInProject.slice(0, 3);
  return (
    <section className="pt-8">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-3xl font-semibold">{project.name}</span>
        </div>
        <div className="flex space-x-16">
          <span
            className="flex space-x-4 border-2 border-dashed px-6 py-3 rounded-2xl cursor-pointer border-spin"
            onClick={() => dispatch(openModal({ modalId: "addMember" }))}
          >
            <PlusIcon className="w-6 h-6" />
            <span>Invite</span>
          </span>
          <div className="flex items-center">
            {showedMember.map((mem, index) => {
              return (
                <img
                  src={mem.image}
                  alt=""
                  className={`w-8 h-8 rounded-full border-white border translate-x-[${
                    -0.75 * index
                  }rem]`}
                />
              );
            })}
            {project.members.length >= 4 && (
              <div className="w-8 h-8 translate-x-[-2.25rem] text-xs bg-tertiary rounded-full text-white flex items-center justify-center border-white border">
                +{project.members.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Status;
