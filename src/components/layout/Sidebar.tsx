"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ClipboardList, Clock, FileBarChart2, FileText, GanttChart, Home, NotepadText, User, Users } from "lucide-react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
// import { Skeleton } from "@/components/ui/skeleton";

const Sidebar = () => {
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
      <aside className="w-64 bg-background border-r min-h-screen p-6">
        <h1>Loading....</h1>
        {/* <Skeleton className="h-8 w-32 mb-6" />
        <nav>
          <ul className="space-y-2">
            {menuItems.map((_, index) => (
              <li key={index}>
                <Skeleton className="h-10 w-full" />
              </li>
            ))}
          </ul>
        </nav> */}
      </aside>
    );
  }

  if (error) {
    return (
      <aside className="w-64 bg-background border-r min-h-screen p-6">
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
    <aside className="w-64 bg-background border-r min-h-screen p-6">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-semibold">Bina Marga</h1>
        {user && (
          <span className="text-xs bg-primary text-white px-2 py-1 rounded-full">
            {user.role.toLowerCase()}
          </span>
        )}
      </div>
      <nav>
        <ul className="space-y-2">
          {filteredMenuItems.map(({ label, icon: Icon, href }) => {
            const isActive = path.startsWith(href) || 
              (href === "/dashboard/home" && path === "/dashboard");

            return (
              <li key={href}>
                <Button
                  asChild
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start px-4 py-3 flex items-center gap-3 text-base",
                    isActive && "bg-primary text-white hover:bg-primary/90"
                  )}
                >
                  <Link href={href}>
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                </Button>
              </li>
            );
          })}
        </ul>
      </nav>
      {user && (
        <div className="mt-8 pt-4 border-t">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;