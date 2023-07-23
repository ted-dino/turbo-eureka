import { ModeToggle } from "./mode-toggle";
import logo from "/tedflix.png";
import Image from "next/image";

const Navigation = () => {
  return (
    <nav>
      <div className="flex items-center">
        <div className="py-4">
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

        <ul className="ml-8 flex space-x-4">
          <li className="nav-item">
            <a href="#" className="nav-link">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Movies
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              Series
            </a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link">
              My List
            </a>
          </li>
        </ul>

        <ul className="ml-auto flex items-center space-x-4">
          <li className="nav-item">
            <Image
              src="/bx-search.svg"
              alt="search icon"
              width={30}
              height={30}
            />
          </li>
          <li className="nav-item">Login</li>
          <li className="nav-item">
            <ModeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
