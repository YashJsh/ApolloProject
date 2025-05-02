import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Button from "./Button";

const Navbar = () => {
  return (
    <div className="sticky top-0 z-50 bg-white ">
      <div className="border-b-[1px] border-slate-200">
        <nav className="container mx-auto flex justify-between px-3 py-2 ">
          <div className="flex gap-6 w-fit">
            <img
              src="https://images.apollo247.in/images/icons/apollo247.svg"
              alt=""
              className="w-17"
            />
            <div className="flex justify-center items-center gap-2">
              <IoLocationOutline size={30} />
              <div className="flex flex-col ">
                <h1 className="text-slate-700 text-sm">Select Location</h1>
                <h1 className="font-bold">Select Address</h1>
              </div>
            </div>
          </div>
          <div className="flex justify-end items-center md:flex-1 md:max-w-2xl mx-4 border border-gray-300 rounded-xl px-5 gap-5 bg-gray-100 cursor-pointer">
            <IoSearch size={20} className="text-gray-500" />
            <input
              type="text"
              placeholder="Search Doctors, Specialities, Conditions, etc"
              className=" md:w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 hidden md:block font-semibold"
            />
          </div>

          <div className="md:w-1/5 flex items-center justify-end">
            <button className="flex items-center md:border-[#165D59] rounded-xl text-[#165D59] px-4 py-2 gap-3 border-[0] md:border-[1px]  ">
              <h1 className="font-bold tracking-tight hidden md:block ">
                Login
              </h1>
              <CgProfile size={30} />
            </button>
          </div>
        </nav>
      </div>
      <div className="border-b-[1px] border-slate-200 shadow-xl">
      <nav className="container mx-auto flex justify-between px-3 py-1 ">
        <div className="flex justify-center items-center text-center gap-10 w-full mb-2">
          <Button title="Buy Medicines"/>
          <Button title="Find Doctors"/>
          <Button title="Lab Tests"/>
          <Button title="Circle Membership"/>
          <Button title="Health Records"/>
          <Button title="Diabetes Reversal"/>
          <Button title="Buy Insurance"/>
        </div>
      </nav>
    </div>
    </div>
  );
};

export default Navbar;
