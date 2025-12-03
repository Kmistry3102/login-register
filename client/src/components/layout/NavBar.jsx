import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FiChevronRight } from "react-icons/fi";

const NavBar = () => {
  return (
    <div className="w-full flex items-center justify-between py-4 px-6 lg:py-4 lg:px-10 absolute top-0">
      <Link href="/">
        <Image
          src="./logo.svg"
          alt="Main Logo"
          width={100}
          height={100}
          className="lg:h-10 h-8"
        />
      </Link>
      <div>
        <Link
          href="/login"
          className="text-base border border-gray-400 text-black px-6 py-2 rounded-lg transition flex items-center
          "
        >
          Login
          <FiChevronRight className="text-base"/>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
