import React from "react";

type containerProps = {
  children: React.ReactNode;
  bg_color?: String;
};

const Container: React.FC<containerProps> = ({ children, bg_color }) => {
  return (
    <div
      className={`${bg_color} flex flex-col items-center justify-center text-white`}
    >
      <div className=" max-w-[1400px] w-[95%]">{children}</div>
    </div>
  );
};

export default Container;
