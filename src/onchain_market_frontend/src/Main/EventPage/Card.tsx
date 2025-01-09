import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiCircleAlert } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { truncateText } from "@/Utils/Function";

interface EventCardProps {
  image: string;
  candidate_name: string;
  title: string;
  classes: string;
}

const EventCard: React.FC<EventCardProps> = ({
  image,
  candidate_name,
  title,
  classes,
}) => {
  return (
    <Card
      className={`flex flex-col justify-between sm:min-w-full  md:min-w-[350px] text-white ${classes}`}
    >
      <div className=" flex  justify_between  items-center gap-3">
        <div className="w-[80px]">
          <img src={image} alt="Event image" className="object-cover" />
        </div>
        <div className="flex flex-col justify-between">
          <p className="text-sm">{truncateText(title)}</p>
          <div className="space-x-2 flex">
            <CardTitle>Buy Yes</CardTitle>
            <CardTitle>{candidate_name}</CardTitle>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <CardDescription>Buy</CardDescription>
          <CardDescription>Sell</CardDescription>
        </div>
        <div className="flex items-center gap-4 border border-r-2 border-slate-400 p-2 rounded-md">
          <CardTitle>Markets</CardTitle>
          <RiArrowDropDownLine />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center space-x-2">
          <CardTitle>Pick your side</CardTitle>
          <AlertCircle size={18} className="text-slate-400" />
        </div>
        <div className="flex justify-between">
          <Button className="p-4 w-[45%]" variant={"secondary"}>
            Yes 1$
          </Button>
          <Button className="p-4 w-[45%]" variant={"outline"}>
            No 1$
          </Button>
        </div>
      </div>
      <div>
        <Input type="number" placeholder="Enter contract to buy" />
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <CardDescription>Average price</CardDescription>
          <CardTitle>$42</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <CardDescription>Estimated cost</CardDescription>
            <CiCircleAlert />
          </div>
          <CardTitle>$42</CardTitle>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <CardDescription>Payout if Yes wins</CardDescription>
            <CiCircleAlert />
          </div>
          <CardTitle>$0</CardTitle>
        </div>
      </div>

      <Button className="w-full bg-gradient-to-b from-[#8055FF] to-[#4D19E0]">
        Buy
      </Button>
    </Card>
  );
};

export default EventCard;
