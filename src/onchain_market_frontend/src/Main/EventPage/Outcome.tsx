import Horizontal from "@/Components/Horizontal";
import { Button } from "@/components/ui/button";
import React from "react";

interface OutcomeProps {
  name: string;
  percentage_vote: number;
}

const Outcome: React.FC<OutcomeProps> = ({ name, percentage_vote }) => {
  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-center w-full py-4 px-2 shadow-md gap-4">
        <div className="w-full md:w-[30%] text-center md:text-left">{name}</div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-[50%] justify-between items-center">
          <div className="text-center md:text-left">{percentage_vote}%</div>
          <div className="flex gap-4 justify-center items-center">
            <Button className="bg-[#70d460] px-4 py-2">
              Yes {percentage_vote}
            </Button>
            <Button className="bg-[#17412d] px-4 py-2">
              No {100 - percentage_vote}
            </Button>
          </div>
        </div>
      </div>
      {/* <Horizontal /> */}
    </div>
  );
};

export default Outcome;
