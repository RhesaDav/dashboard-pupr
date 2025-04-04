"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, FileBarChart2, FileText, GanttChart, Home, NotepadText, User, Users } from "lucide-react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

interface SidebarProps {
    isOpen: boolean;
}

const Sidebar = ({ isOpen }: SidebarProps) => { 
  const path = usePathname();
  const { user, loading, error } = useCurrentUser();

  const menuItems = [
    { label: "Home", icon: Home, href: "/dashboard/home", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { label: "Data Kontrak", icon: FileText, href: "/dashboard/contracts", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { label: "Progress", icon: GanttChart, href: "/dashboard/progress", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { label: "Laporan", icon: FileBarChart2, href: "/dashboard/report", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { label: "Lakip", icon: ClipboardList, href: "/dashboard/lakip", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { label: "Management User", icon: Users, href: "/dashboard/user-management", roles: ["ADMIN", "SUPERADMIN"] },
  ];

  if (loading) {
    return (
      <aside className="w-64 bg-background border-r min-h-screen p-6 hidden md:block"> 
        <h1 className="text-2xl font-semibold mb-6">Bina Marga</h1>
        <p>Loading user...</p>
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-64 bg-background border-r min-h-screen p-6 hidden md:block"> 
        <h1 className="text-2xl font-semibold mb-6">Bina Marga</h1>
        <div className="text-red-500 text-sm p-2 bg-red-50 rounded">
          Error loading user data
        </div>
      </aside>
    );
  }

  const filteredMenuItems = menuItems.filter(item =>
    user?.role && item.roles.includes(user.role)
  );

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 bg-background border-r min-h-screen p-4 md:p-6", 
        "flex flex-col", // Tambahkan flex-col
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full", 
        "md:translate-x-0 md:static md:inset-auto md:z-auto" 
      )}
    >
      <div className="flex items-center gap-2 mb-6">
        <h1 className="text-xl md:text-2xl font-semibold">Bina Marga</h1>
        {user && (
          <span className="text-[10px] md:text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full"> 
            {user.role.toLowerCase()}
          </span>
        )}
      </div>

      <nav className="flex-grow"> 
        <ul className="space-y-1.5 md:space-y-2">
          {filteredMenuItems.map(({ label, icon: Icon, href }) => {
            const isActive = path === href || (href !== "/dashboard/home" && path.startsWith(href)) || (href === "/dashboard/home" && (path === "/dashboard" || path === "/dashboard/home")); // Logika active lebih akurat

            return (
              <li key={href}>
                <Button
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-base", 
                  )}
                >
                  <Link href={href}>
                    <Icon className="w-4 h-4 md:w-5 md:h-5" /> 
                    {label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="mt-auto pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium line-clamp-1">{user.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;