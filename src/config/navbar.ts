export interface NavItem {
  name: string;
  icon?: React.ReactNode;
  href: string;
  selected?: boolean;
  onClick?: () => void;
}

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Admin",
    href: "/admin",
  },
];
