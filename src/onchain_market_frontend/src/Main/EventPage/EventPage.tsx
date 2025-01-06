import Container from "@/Components/Container";
import eventImage from "@/images/Screenshot from 2025-01-03 08-48-34.png";
import EventPageDetails from "./EventPageDetails";

const EventPage = () => {
  const event = {
    id: 1,
    image: eventImage,
    title: "Will Raila win the AUC Chairperson seat",
    candidates: [
      {
        candidate_name: "Raila",
        percentage_vote: 50,
      },
      {
        candidate_name: "Mahmoud",
        percentage_vote: 30,
      },
      {
        candidate_name: "Other candidate",
        percentage_vote: 20,
      },
    ],
    volume: 30000000,
  };

  return (
    <div className="min-h-screen bg-[#171834e5]">
      <div className="flex justify-center">
        <div className=" max-w-[1300px] w-[90%] flex justify-center text-white">
          <EventPageDetails
            image={event.image}
            title={event.title}
            volume={event.volume}
            candidates={event.candidates}
            id={event.id}
          />
        </div>
      </div>
    </div>
  );
};

export default EventPage;
