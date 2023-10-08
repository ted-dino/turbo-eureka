"use client";

import Image from "next/image";
import MobileMenu from "./mobile-menu";
import { useCallback, useEffect, useState, useRef } from "react";
import menu from "@/data/menu";
import SearchInput from "../custom-ui/Common/SearchInput";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navigation = () => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isFocused]);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((prevState) => !prevState);
  }, []);

  return (
    <nav className={`w-full fixed z-10 top-0`}>
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
                <a href={`${menu.link}`} className="nav-link">
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>

          <ul className="ml-auto flex items-center space-x-4">
            <li
              ref={ref}
              className="nav-item relative"
              onClick={() => {
                setIsFocused(true);
                searchInput.current?.focus();
              }}
            >
              <SearchInput
                isFocused={isFocused}
                searchInput={searchInput}
                setIsFocused={setIsFocused}
              />
            </li>
            <li className="nav-item">
              <Link href={`${pathname}?showLogin=true`}>Login</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
