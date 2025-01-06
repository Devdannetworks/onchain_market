import eventImage1 from "@/images/Screenshot from 2025-01-03 08-48-34.png";
import Event from "./Event";

export const events = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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
    id: 5,
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
    id: 6,
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

const Events = () => {
  return (
    <div className="pt-6 pb-6 gap-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {events.map((event) => (
        <div className="" key={event.id}>
          <Event
            image={event.image}
            title={event.title}
            candidates={event.candidates}
            volume={event.volume}
            id={event.id}
          />
        </div>
      ))}
    </div>
  );
};

export default Events;
