import { eventProps } from "@/Types/Types";
import React from "react";
import Candidate from "./Candidate";
import logo from "@/images/logo.svg";
import { IoIosArrowDown } from "react-icons/io";
import AllRelatedEvents from "../RelatedEvents/AllRelatedEvents";

const EventPageDetails: React.FC<eventProps> = ({
  image,
  title,
  candidates,
  volume,
}) => {
  return (
    <div className="block lg:flex  justify-between gap-4 py-[50px] w-full ">
      <div className=" flex flex-col gap-6  w-full ">
        <div className="flex items-center gap-4">
          <div className="w-[150px]">
            <img
              src={image}
              alt="Event subject image"
              className="object-cover"
            />
          </div>
          <h5 className="text-xl font-bold">{title}</h5>
        </div>
        <hr className="border-gray-500 max-w-[400px]" />
        <div>
          <div className="flex justify-between items-center gap-8 w-full ">
            <div className="flex items-center justify-between gap-6">
              {candidates.map((candidate) => (
                <Candidate
                  key={candidate.candidate_name}
                  name={candidate.candidate_name}
                  percentage={candidate.percentage_vote}
                />
              ))}
            </div>
            <div className="h-[65px] w-[150px] flex items-center">
              <img src={logo} alt="Cjainmarket logo" className="object-cover" />
            </div>
          </div>
          <div>Chart</div>
        </div>
        <hr className="border-gray-500 max-w-[400px]" />
        <div className="border border-gray-500 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">OrderBook</h2>
            <IoIosArrowDown className="text-2xl" />
          </div>
          <div></div>
        </div>

        <hr className="border-gray-500 max-w-[400px]" />
        <div className="flex flex-col gap-3">
          <h4 className="text-xl font-semibold">Rules</h4>
          <p className="text-sm">
            This market will resolve to "Yes" if there is an official ceasefire
            agreement, defined as a publicly announced and mutually agreed halt
            in military engagement, between Israel and Hamas between December 25
            and January 31, 2025, 11:59 PM ET. If the agreement is officially
            reached before the resolution date, this market will resolve to
            "Yes", regardless of whether the ceasefire officially starts
            afterwards. Any form of informal agreement will not be considered an
            official ceasefire. Humanitarian pauses will not count toward the
            resolution of this market. This market's resolution will be based on
            official announcements from both Israel and Hamas, however a wide
            consensus of credible media reporting stating an official ceasefire
            agreement between Israel and Hamas has been reached will suffice.
          </p>
        </div>
        <hr className="border-gray-500 max-w-[400px]" />
        <div>
          <h4 className="text-xl font-semibold">People are also buying</h4>
          <div>
            <AllRelatedEvents />
          </div>
        </div>
      </div>
      <div className="sm:mt-6 md:mt-6 h-[500px] w-[400px] bg-[#212348a1] shadow-lg rounded-md border-1 border-slate-500 p-4">
        Hello there
      </div>
    </div>
  );
};

export default EventPageDetails;
