import Container from "@/Components/Container";
import Events from "./Events/Events";

const Main = () => {
  return (
    <div>
      <Container bg_color={"bg-[#171834e5]"}>
        <div className="min-h-[100vh] ">
          <Events />
        </div>
      </Container>
    </div>
  );
};

export default Main;
