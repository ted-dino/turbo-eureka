"use client";

import { ModeToggle } from "./mode-toggle";
import Image from "next/image";
import { Search } from "lucide-react";
import MobileMenu from "./mobile-menu";
import { useCallback, useEffect, useState } from "react";
import menu from "@/data/menu";

const Navigation = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  const TOP_OFFSET = 66;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prevState) => !prevState);
  }, []);

  return (
    <nav className={`w-full fixed z-11`}>
      <div
        className={`px-10 flex items-center transition ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <div className="mr-8 py-4">
          <a href="/">
            <Image
              src="/tedflix.png"
              alt="logo"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
        <div className="block lg:hidden">
          <MobileMenu
            toggleMobileMenu={toggleMobileMenu}
            showMobileMenu={showMobileMenu}
          />
        </div>

        <div className="w-full hidden lg:flex lg:items-center">
          <ul className="flex space-x-4">
            {menu.map((menu) => (
              <li className="nav-item" key={menu.id}>
                <a href="#" className="nav-link">
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="ml-auto flex items-center space-x-4">
            <li className="nav-item">
              <Search className="cursor-pointer" />
            </li>
            <li className="nav-item">Login</li>
            <li className="nav-item">
              <ModeToggle />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
