import Heading from "@/Components/Heading";
import Container from "../../Components/Container";
import { Button } from "@/components/ui/button";
import logo1 from "@/images/logo.svg";
import { CiSearch } from "react-icons/ci";
import Search from "@/Components/Search";

const Nav = () => {
  return (
    <Container bg_color={"bg-[#11122D]"}>
      <div className="flex justify-between items-center ">
        <div className=" flex items-center h-[65px] w-[240px]">
          <img
            src={logo1}
            alt="Chain market logo"
            className="object-cover  p-4"
          />
        </div>
        <div>
          <Search />
        </div>

        <div className="flex  items-center text-center space-x-2">
          <Button className="border-white border bg-transparent">
            Sign up
          </Button>
          <Button variant="secondary">Log in</Button>
        </div>
      </div>
    </Container>
  );
};

export default Nav;
// Cards bg background:linear-gradient(180deg, #8055FF 0%, #4D19E0 100%)
// CTA backgrounds bg-[#635BFF]
// Main section background:linear-gradient(180deg, , 27, 1rgba(1813, 0) 0%, #0E1A88 60.24%, #121E85 100%)
