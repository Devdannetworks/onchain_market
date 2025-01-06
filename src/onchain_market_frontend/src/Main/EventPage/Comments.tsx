import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Comments = () => {
  return (
    <div className="grid w-full gap-2 py-8">
      <Textarea placeholder="Add your comment here!" />
      <Button className="bg-gradient-to-b from-[#8055FF] to-[#4D19E0] max-w-[140px]">
        Add Comment
      </Button>
    </div>
  );
};

export default Comments;
