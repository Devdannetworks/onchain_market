import Container from "@/Components/Container";
import Events from "@/Main/Events/Events";

const Hero = () => {
  return (
    <Container bg_color={"bg-[#11122de4]"}>
      <div className="min-h-[100vh] ">
        <Events />
      </div>
    </Container>
  );
};

export default Hero;
