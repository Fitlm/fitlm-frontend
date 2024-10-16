import React from "react";
import NavItem from "./Sections/NavItem";
import Logo from "../../components/Logo";

const Navbar = () => {
  return (
    <section className="relative z-10 text-black bg-[#e2d7d2] h-full">
      <div className="flex flex-col w-[21vw] min-w-[200px] max-w-[240px] h-full">
        <div className="flex flex-col items-start justify-start h-full mx-5 sm:mx-10 lg:mx-20 mt-10">
          <div className="flex items-start w-full h-3/4">
            <NavItem />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
