import { FaDotCircle } from "react-icons/fa";
interface CandidateProps {
  name: String;
  percentage: number;
}

const Candidate: React.FC<CandidateProps> = ({ name, percentage }) => {
  return (
    <div className="flex md:justify-center gap-3 items-center">
      <FaDotCircle />
      <h4 className="font-semibold text-sm ">{name}</h4>
      <div className="tex-sm font-semibold">{percentage}%</div>
    </div>
  );
};

export default Candidate;
