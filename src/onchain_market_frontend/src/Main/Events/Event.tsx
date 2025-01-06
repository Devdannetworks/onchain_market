import { CiBookmarkCheck, CiBookmark, CiChat1 } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import React from "react";
import Candidate from "./Candidate";
import { eventProps } from "@/Types/Types";
import { useNavigate } from "react-router-dom";

//
const Event: React.FC<eventProps> = ({
  image,
  title,
  candidates,
  volume,
  id,
}) => {
  const navigate = useNavigate();
  const showEventPage = (id: number) => {
    navigate(`/event/${id}`);
  };

  return (
    <div className="pt-6 pb-6 pr-4 pl-4 rounded-md bg-[#212348a1] space-y-4 shadow-md">
      <div
        className="cursor-pointer pb-4 flex justify-between space-x-3 text-sm font-semibold items-start"
        onClick={() => showEventPage(id)}
      >
        <div className="w-[100px]">
          <img
            src={image}
            alt="Subject photo"
            className="object-cover border border-2px"
          />
        </div>
        <h6 className="font-semibold text-[16px]">{title}</h6>
      </div>

      {candidates.map((candidate) => (
        <Candidate
          name={candidate.candidate_name}
          percentage_vote={candidate.percentage_vote}
          key={candidate.candidate_name}
        />
      ))}

      <div className="pt-4 font-light flex text-xs font-sans justify-between items-center">
        <div>vol: {volume}</div>
        <div className="flex space-x-3 text-lg">
          <CiChat1 className="cursor-pointer" />
          <div>
            <CiBookmark className="cursor-pointer" />
          </div>
          <AiOutlineTransaction className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default Event;
