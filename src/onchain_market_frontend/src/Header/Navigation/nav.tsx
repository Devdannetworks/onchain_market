import Container from "../../Components/Container";
import { Button } from "@/components/ui/button";
import logo1 from "@/images/logo.png";

const Nav = () => {
  return (
    <Container bg_color={"#2596be"}>
      <div>
        <div className="h-20 w-20">
          <img src={logo1} alt="Chain  market logo" className="object-cover" />
        </div>
        <h5>Chain market</h5>
      </div>
      <div>
        <Button>Click me!</Button>
      </div>
      <div></div>
    </Container>
  );
};

export default Nav;
