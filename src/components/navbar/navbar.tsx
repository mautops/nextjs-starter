"use client";
import { AiFillMacCommand } from "react-icons/ai";
import Link from "next/link";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme";
import { NavItem, navItems } from "@/config/navbar";
import { SiteConfig } from "@/config/base";
import { NavUser } from "./nav-user";
import { useSession } from "next-auth/react";

function NavMenuItem({ name, icon, href, selected, onClick }: NavItem) {
  return (
    <Button className="shadow-none" variant="link">
      <Link
        href={href}
        className={cn(
          "flex flex-row gap-2 font-bold text-xl",
          selected && "shadow-xl shadow-red-500"
        )}
      >
        {icon}
        {name}
      </Link>
    </Button>
  );
}

export default function Navbar() {
  // 获取当前路径
  const pathname = usePathname();
  const selectedMenu = navItems.find((item) => item.href === pathname);

  const { status, data } = useSession();

  return (
    <menu className="flex flex-row items-center w-full gap-4 p-2 border-b-2 border-primary-100 h-20">
      <div className="flex flex-row gap-2 items-center ml-6">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <AiFillMacCommand className="text-2xl" />
          <span className="text-xl font-bold ">{SiteConfig.name}</span>
        </Link>
      </div>
      <div className="flex flex-row gap-4 flex-grow">
        {navItems.map((item) => (
          <NavMenuItem
            key={item.name}
            {...item}
            selected={selectedMenu?.name === item.name}
            // onClick={() => setSelectedMenu(item.name)}
          />
        ))}
      </div>
      {status === "authenticated" && <NavUser user={data.user} />}
      <ThemeToggle />
    </menu>
  );
}
