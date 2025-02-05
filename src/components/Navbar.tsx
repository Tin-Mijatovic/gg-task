import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className=" text-lg font-bold">GG Task App</div>
        <div className="flex space-x-4">
          <Link href="/" className=" hover:text-gray-300">
            Home
          </Link>
          <Link href="/favorites" className=" hover:text-gray-300">
            Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
