import Container from "@/Components/Container";
import logo1 from "@/images/logo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Categories from "../Categories/Categories";

const Drawer = () => {
  return (
    <div className="block md:hidden focus:outline-none">
      <Container bg_color={"bg-[#11122D]"}>
        <div className="flex items-center justify-between h-[65px]">
          <div className="flex items-center h-[65px] w-[180px] cursor-pointer">
            <img
              src={logo1}
              alt="Chain market logo"
              className="object-cover p-4"
            />
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
      <div className="">
        <Categories />
      </div>
    </div>
  );
};

export default Drawer;
