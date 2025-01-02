import { useState } from "react";
import { Input } from "@/components/ui/input";
import { CiSearch } from "react-icons/ci";

const Search = () => {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex w-full max-w-sm items-center ">
      <Input
        type="search"
        placeholder="search markets"
        className="rounded-r-none"
      />
      <div className="bg-slate-600 h-[36px] pl-1 pr-1 flex flex-col items-center justify-center rounded-r-md">
        <h5>Search</h5>
      </div>
    </div>
  );
};

export default Search;
