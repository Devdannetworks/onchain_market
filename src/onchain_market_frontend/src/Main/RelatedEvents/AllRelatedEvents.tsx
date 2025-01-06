import { Button } from "@/components/ui/button";
import { events } from "../Events/Events";
import RelatedEvents from "./RelatedEvents";

const AllRelatedEvents = () => {
  // const events = events.filter((event) => event.title === title)
  return (
    <div>
      {events.map((event) => (
        <div>
          <RelatedEvents
            title={event.title}
            image={event.image}
            candidates={event.candidates}
            id={event.id}
            volume={event.volume}
          />
        </div>
      ))}
      <div>
        <Button
          variant={"outline"}
          className="text-white bg-slate-500 border-slate-500"
        >
          Show more
        </Button>
      </div>
    </div>
  );
};

export default AllRelatedEvents;
