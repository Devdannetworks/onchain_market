import Container from "../../Components/Container";
import { Button } from "@/components/ui/button";

const Nav = () => {
  return (
    <Container bg_color={"#100a28"}>
      <div>
        <div className="h-10 w-10">
          <img src="" alt="Chain  market logo" className="object-cover" />
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
