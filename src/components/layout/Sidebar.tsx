"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiHome, FiFileText } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const path = usePathname();

  const menuItems = [
    { label: "Home", icon: FiHome, href: "/dashboard/home" },
    { label: "Data Kontrak", icon: FiFileText, href: "/dashboard/contracts" },
  ];

  return (
    <aside className="w-64 bg-background border-r min-h-screen p-6">
      <h1 className="text-2xl font-semibold mb-6">Admin Dashboard</h1>
      <nav>
        <ul className="space-y-2">
          {menuItems.map(({ label, icon: Icon, href }) => (
            <li key={href}>
              <Button
                asChild
                variant={path === href ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start px-4 py-3 flex items-center gap-3 text-base",
                  path === href && "bg-primary text-white"
                )}
              >
                <Link href={href}>
                  <Icon className="w-5 h-5" />
                  {label}
                </Link>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
