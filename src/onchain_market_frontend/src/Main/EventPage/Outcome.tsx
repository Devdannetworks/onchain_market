import Horizontal from "@/Components/Horizontal";
import { Button } from "@/components/ui/button";
import React from "react";

interface OutcomeProps {
  name: string;
  percentage_vote: number;
}

const Outcome: React.FC<OutcomeProps> = ({ name, percentage_vote }) => {
  return (
    <div className="">
      <div className="flex justify-between w-full py-4 px-2 shadow-md">
        <div className="w-[30%]">{name}</div>

        <div className="flex gap-8 w-[50%] justify-between items-center">
          <div className="">{percentage_vote}%</div>
          <div className="flex gap-4 items-center ">
            <Button className="bg-[#70d460]">Yes {percentage_vote}</Button>
            <Button className="bg-[#17412d]">No {100 - percentage_vote}</Button>
          </div>
        </div>
      </div>
      {/* <Horizontal /> */}
    </div>
  );
};

export default Outcome;

//#70d460
//#17412d
