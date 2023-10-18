import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/queryFns/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface Props {
  user: string;
}

export default function LogoutButton({ user }: Props) {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      location.reload();
    },
  });

  const logoutUser = async () => {
    await logout();
  };

  const handleClick = async () => {
    mutate();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-8 w-8">
        <Image
          src="https://api.dicebear.com/7.x/fun-emoji/png?radius=10&size=30"
          alt="avatar"
          width={30}
          height={30}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-[#141414] text-white relative -left-9">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/my-list">My List</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleClick}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
