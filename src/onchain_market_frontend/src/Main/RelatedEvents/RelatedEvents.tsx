import { eventProps } from "@/Types/Types";
import { Progress } from "@/components/ui/progress";

const RelatedEvents: React.FC<eventProps> = ({
  image,
  title,
  candidates,
  id,
}) => {
  return (
    <div className="flex  space-x-4 items-center p-4">
      <div className="w-[80px] h-[40px]">
        <img src={image} alt="Event Image" className="object-cover" />
      </div>
      <div className="flex flex-col  justify-evenly">
        <h5>{title}</h5>
        <div className="flex gap-4 items-center">
          <Progress value={candidates[0].percentage_vote} />
          <div>{candidates[0].candidate_name}</div>
          <div>{candidates[0].percentage_vote}%</div>
        </div>
      </div>
    </div>
  );
};

export default RelatedEvents;
