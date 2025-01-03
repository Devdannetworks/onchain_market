import eventImage1 from "@/images/Screenshot from 2025-01-03 08-48-34.png";
import Event from "./Event";

const Events = () => {
  const events = [
    {
      image: eventImage1,
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
    },
    {
      image: eventImage1,
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
    },
    {
      image: eventImage1,
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
    },
    {
      image: eventImage1,
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
    },
    {
      image: eventImage1,
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
    },
    {
      image: eventImage1,
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
    },
  ];
  return (
    <div className="pt-6 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {events.map((event) => (
        <div className="">
          <Event
            image={event.image}
            title={event.title}
            candidates={event.candidates}
            volume={event.volume}
            key={event.title}
          />
        </div>
      ))}
    </div>
  );
};

export default Events;
