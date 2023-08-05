import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronUp } from "lucide-react";
import menu from "@/data/menu";

interface Props {
  showMobileMenu: boolean;
  toggleMobileMenu: () => void;
}

export default function MobileMenu(
  { showMobileMenu, toggleMobileMenu }: Props,
) {
  return (
    <DropdownMenu onOpenChange={toggleMobileMenu}>
      <DropdownMenuTrigger className="flex items-center gap-x-2">
        Browse{" "}
        <ChevronUp
          className={`transition ${showMobileMenu ? "rotate-180" : "rotate-0"}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-black dark:text-white">
        {menu.map((menu) => <DropdownMenuItem>{menu.name}</DropdownMenuItem>)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
