import { MdOutlineSportsFootball, MdNewReleases } from "react-icons/md";
import { RiGovernmentFill } from "react-icons/ri";
import { FaMusic, FaBusinessTime } from "react-icons/fa";
import { MdScience } from "react-icons/md";
import { TiThSmallOutline } from "react-icons/ti";

const Categories = () => {
  const categories = [
    {
      name: "All",
      icon: TiThSmallOutline,
    },
    {
      name: "New",
      icon: MdNewReleases,
    },
    {
      name: "Politics",
      icon: RiGovernmentFill,
    },
    {
      name: "Sports",
      icon: MdOutlineSportsFootball,
    },
    {
      name: "Pop culture",
      icon: FaMusic,
    },
    {
      name: "Business",
      icon: FaBusinessTime,
    },
    {
      name: "Science",
      icon: MdScience,
    },
  ];

  return (
    <div className="bg-[#11122D] flex flex-col justify-center items-center py-4 ">
      <div className="flex justify-between items-center max-w-[1400px] text-white w-[95%] overflow-x-scroll scrollbar-hide gap-8">
        {categories.map((category) => (
          <div
            key={category.name}
            className="flex gap-2 items-center text-sm font-light"
          >
            <category.icon size={18} />
            <h5 className="whitespace-nowrap">{category.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
