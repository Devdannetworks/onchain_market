import { Button } from "@/components/ui/button";
import { events } from "../Events/Events";
import RelatedEvents from "./RelatedEvents";
import { useState } from "react";

const AllRelatedEvents = () => {
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleView = () => {
    if (isExpanded) {
      setVisibleCount(3);
    } else {
      setVisibleCount(events.length);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="transition-all duration-500 ease-in-out">
      <div className="grid gap-4">
        {events.slice(0, visibleCount).map((event) => (
          <div key={event.id}>
            <RelatedEvents
              title={event.title}
              image={event.image}
              candidates={event.candidates}
              id={event.id}
              volume={event.volume}
            />
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <Button
          variant={"outline"}
          className="text-white bg-slate-500 border-slate-500"
          onClick={toggleView}
        >
          {isExpanded ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
};

export default AllRelatedEvents;
