import React from "react";

type containerProps = {
  children: React.ReactNode;
  bg_color: String;
};

const Container: React.FC<containerProps> = ({ children, bg_color }) => {
  return (
    <div className={`${bg_color} flex flex-col items-center justify-center`}>
      <div className={`max-w-[1000px]`}>{children}</div>
    </div>
  );
};

export default Container;
