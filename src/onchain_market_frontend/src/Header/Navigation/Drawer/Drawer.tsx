import BackDrop from "@/Components/BackDrop";
import Container from "@/Components/Container";
import { CiMenuFries } from "react-icons/ci";
import logo1 from "@/images/logo.svg";
import { AiOutlineClose } from "react-icons/ai";
import { useState } from "react";

const Drawer = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  const handleBackdrop = () => {
    setIsOpen(false);
  };

  return (
    <div className="block md:hidden focus:outline-none">
      <Container bg_color={"bg-[#11122D]"}>
        <div className="flex items-center justify-between h-[65px]">
          <div className="flex items-center h-[65px] w-[240px] cursor-pointer">
            <img
              src={logo1}
              alt="Chain market logo"
              className="object-cover p-4"
            />
          </div>
          <CiMenuFries
            className="text-2xl cursor-pointer"
            onClick={toggleDrawer}
          />
        </div>
      </Container>

      {/* Drawer */}
      <div
        className={`fixed z-50 top-0 left-0 w-[80%] h-screen pb-[65px] bg-[#2f304c] text-white transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center h-[65px] px-6 border-b-2">
          <div className="w-[160px] h-[65px] flex items-center  text-center">
            <img src={logo1} alt="logo" className="object-cover " />
          </div>
          <AiOutlineClose className="text-2xl" onClick={toggleDrawer} />
        </div>
      </div>

      {/* Backdrop */}
      {isOpen && <BackDrop onClick={handleBackdrop} />}
    </div>
  );
};

export default Drawer;
