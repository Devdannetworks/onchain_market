import React from "react";

interface HeadingProps {
  text: string;
}

const Heading: React.FC<HeadingProps> = ({ text }) => {
  return <h3 className="font-semibold text-2xl">{text}</h3>;
};

export default Heading;
