import { CiBookmarkCheck, CiBookmark, CiChat1 } from "react-icons/ci";
import { AiOutlineTransaction } from "react-icons/ai";
import React from "react";
import Candidate from "./Candidate";

interface eventProps {
  image: string;
  title: string;
  candidates: candidates_details[];
  volume: number;
}

interface candidates_details {
  candidate_name: string;
  percentage_vote: number;
}

const Event: React.FC<eventProps> = ({ image, title, candidates, volume }) => {
  return (
    <div className="p-3 rounded-md bg-gradient-to-b from-[#8055FF] to-[#4D19E0]">
      <div className="cursor-pointer pb-4 flex justify-between space-x-3 text-sm font-semibold items-start">
        <div className="w-[100px]">
          <img
            src={image}
            alt="Subject photo"
            className="object-cover border border-2px"
          />
        </div>
        <h6>{title}</h6>
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
