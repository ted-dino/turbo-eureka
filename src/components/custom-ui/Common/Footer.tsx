import { footer } from "@/data/menu";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center space-y-5 my-10">
      <Image src={"/tedflix.png"} alt="logo" width={300} height={150} />
      <nav>
        <ul className="flex flex-wrap space-x-5 justify-center items-center">
          {footer.map((item) => (
            <li key={item.id}>
              <a href={item.link}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>

      <p className="text-center">
        &copy; {new Date().getFullYear()} TedFlix. All rights reserved.
      </p>
    </footer>
  );
}
