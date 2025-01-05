import React from "react";

interface BackDropProps {
  onClick: () => void;
}

const BackDrop: React.FC<BackDropProps> = ({ onClick }) => {
  return (
    <div
      className="fixed z-2 bg-slate-300 opacity-50 w-screen h-screen top-0 left-0"
      onClick={onClick}
    ></div>
  );
};

export default BackDrop;
