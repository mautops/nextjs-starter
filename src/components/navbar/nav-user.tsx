import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/auth/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

export function NavUser({ user }: { user: User }) {
  // 判断用户信息是否为空
  if (user.email === null || user.name === null || user.image === null)
    return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex justify-items-center space-x-3">
          <Avatar className="h-10 w-10 rounded-lg">
            <AvatarImage src={user.image} alt={user.name} />
          </Avatar>
          <div className="flex flex-col font-extrabold">
            <span className="text-xl">{user.name}</span>
            <span className="text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] rounded-lg">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
