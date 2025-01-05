import Container from "../../Components/Container";
import { Button } from "@/components/ui/button";
import logo1 from "@/images/logo.svg";
import Search from "@/Components/Search";
import Categories from "./Categories/Categories";
import Drawer from "./Drawer/Drawer";

const Nav = () => {
  return (
    <div>
      <div className="hidden md:flex flex-col">
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

            <div className="flex  items-center text-center space-x-6">
              <Button className="border-white border bg-transparent">
                Sign up
              </Button>
              <Button
                variant="secondary"
                className="bg-gradient-to-b from-[#8055FF] to-[#4D19E0] text-white px-4 py-2"
              >
                Log in
              </Button>
            </div>
          </div>
        </Container>
        <hr className="border-t border-gray-600 opacity-50" />

        <Categories />
      </div>
      <div>
        <Drawer />
      </div>
    </div>
  );
};

export default Nav;

// Cards bg background:linear-gradient(180deg, #8055FF 0%, #4D19E0 100%)
// CTA backgrounds bg-[#635BFF]
// Main section background:linear-gradient(180deg, , 27, 1rgba(1813, 0) 0%, #0E1A88 60.24%, #121E85 100%)
