"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  FileText, 
  GanttChartSquare, 
  BarChart2, 
  ClipboardList, 
  Users,
  Clock,
  FileBarChart2,
  NotebookText,
  User,
  CircleDollarSign,
  Construction,
  GanttChart,
  LineChart,
  BarChart3,
  ChevronDown,
  TriangleAlert
} from "lucide-react";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";
import { Role } from "@prisma/client";
import { useState } from "react";
import Image from "next/image";

interface SidebarProps {
  isOpen: boolean;
}

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  roles: Role[];
  children?: {
    label: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
}

const Sidebar = ({ isOpen }: SidebarProps) => { 
  const path = usePathname();
  const { user, loading, error } = useCurrentUser();
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSubmenu = (label: string) => {
    setOpenSubmenu(openSubmenu === label ? null : label);
  };

  const menuItems: MenuItem[] = [
    { label: "Home", icon: Home, href: "/dashboard/home", roles: [ "SUPERADMIN"] },
    { label: "Data Kontrak", icon: FileText, href: "/dashboard/contracts", roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"] },
    { 
      label: "Progress", 
      icon: GanttChart, 
      roles: ["ADMIN", "SUPERADMIN", "CONSULTANT"], 
      children: [
        {
          label: "Progress Keuangan",
          href: "/dashboard/financial-progress",
          icon: LineChart
        },
        {
          label: "Progress Fisik",
          href: "/dashboard/physical-progress",
          icon: BarChart3
        },
      ] 
    },
    { label: "Laporan", icon: FileBarChart2, href: "/dashboard/report", roles: [ "SUPERADMIN"] },
    { label: "Lakip", icon: ClipboardList, href: "/dashboard/lakip", roles: [ "SUPERADMIN"] },
    { label: "Kelola Pengguna", icon: Users, href: "/dashboard/user-management", roles: ["ADMIN", "SUPERADMIN"] },
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
        "fixed inset-y-0 left-0 z-30 w-64 bg-background border-r p-4 md:p-6",
        "flex flex-col",
        "transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:translate-x-0",
        "md:h-screen md:overflow-y-auto"
      )}
    >
<div className="flex items-center gap-3 mb-6 flex-shrink-0">
        <div className="relative w-10 h-10">
          <Image
            src="/img/logo-papua.png"
            alt="Logo Bina Marga Papua"
            fill
            className="object-contain"
            sizes="40px"
            priority
          />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-semibold leading-tight">Bina Marga</h1>
          <span className="text-xs text-muted-foreground">Provinsi Papua Barat</span>
        </div>
      </div>
      <nav className="flex-grow overflow-y-auto"> 
        <ul className="space-y-1.5 md:space-y-2">
          {filteredMenuItems.map((item) => {
            const isActive = 
              item.href && (
                path === item.href || 
                (item.href !== "/dashboard/home" && path.startsWith(item.href)) || 
                (item.href === "/dashboard/home" && (path === "/dashboard" || path === "/dashboard/home"))
              );

            const isSubmenuActive = item.children?.some(child => path === child.href || path.startsWith(child.href));
            const isExpanded = openSubmenu === item.label;
            
            const Icon = item.icon;

            return (
              <li key={item.label}>
                {item.children ? (
                  <div>
                    <Button
                      variant={isSubmenuActive ? "default" : "ghost"}
                      className={cn(
                        "w-full justify-between px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-base",
                      )}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <div className="flex items-center gap-2 md:gap-3">
                        <Icon className="w-4 h-4 md:w-5 md:h-5" />
                        {item.label}
                      </div>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform",
                        isExpanded ? "transform rotate-180" : ""
                      )} />
                    </Button>
                    
                    {isExpanded && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.children.map((child) => {
                          const isChildActive = path === child.href || path.startsWith(child.href);
                          const ChildIcon = child.icon;
                          
                          return (
                            <li key={child.href}>
                              <Button
                                asChild
                                variant={isChildActive ? "default" : "ghost"}
                                className="w-full justify-start px-3 py-2 text-sm"
                              >
                                <Link href={child.href}>
                                  {ChildIcon && <ChildIcon className="w-4 h-4 mr-2" />}
                                  {child.label}
                                </Link>
                              </Button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                ) : (
                  <Button
                    asChild
                    variant={isActive ? "default" : "ghost"}
                    className="w-full justify-start px-3 py-2 md:px-4 md:py-3 flex items-center gap-2 md:gap-3 text-sm md:text-base"
                  >
                    <Link href={item.href!}>
                      <Icon className="w-4 h-4 md:w-5 md:h-5" />
                      {item.label}
                    </Link>
                  </Button>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {user && (
        <div className="mt-4 pt-4 border-t flex-shrink-0"> 
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