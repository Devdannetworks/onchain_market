import React from "react";

interface CandidateProps {
  name: string;
  percentage_vote: number;
}

const Candidate: React.FC<CandidateProps> = ({ name, percentage_vote }) => {
  return (
    <div className="flex justify-between items-center text-sm mb-2">
      <div className="font-semibold">{name}</div>
      <div className="flex justify-between items-center space-x-3">
        <h5>{percentage_vote}</h5>
        <div className="flex items-center space-x-2">
          <p className="bg-slate-400 p-2 rounded-md">Yes</p>
          <p className="bg-slate-400 p-2 rounded-md">No</p>
        </div>
      </div>
    </div>
  );
};

export default Candidate;
