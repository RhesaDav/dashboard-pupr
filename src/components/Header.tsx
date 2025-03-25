"use client"
import { useState } from "react";
import { FiMenu, FiUser } from "react-icons/fi";

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h2 className="text-lg font-semibold">Dashboard</h2>
      <div className="relative">
        <button
          className="flex items-center space-x-2 focus:outline-none"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <FiUser className="text-gray-700" />
          <span>Admin</span>
          <FiMenu className="text-gray-700" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md">
            <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">Sign Out</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;