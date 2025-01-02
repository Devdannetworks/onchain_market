import Heading from "@/Components/Heading";
import Container from "../../Components/Container";
import { Button } from "@/components/ui/button";
import logo1 from "@/images/logo.svg";

const Nav = () => {
  return (
    <Container bg_color={"bg-[#2596be]"}>
      <div className="flex justify-between items-center ">
        <div className=" flex items-center h-[65px] w-[240px]">
          <img
            src={logo1}
            alt="Chain market logo"
            className="object-cover  p-4"
          />
        </div>
        <div>
          <h5>Chain market</h5>
        </div>

        <div className="flex  items-center text-center">
          <Button>Click me!</Button>
        </div>
      </div>
    </Container>
  );
};

export default Nav;
