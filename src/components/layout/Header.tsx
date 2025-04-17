"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel, 
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { logoutAction } from "@/actions/auth";
import { LogOut, Menu, User } from "lucide-react"; 
import { useCurrentUser } from "@/lib/hooks/useCurrentUser"; 

interface HeaderProps {
    onToggleSidebar: () => void;
}

const Header = ({ onToggleSidebar }: HeaderProps) => {
    const { user } = useCurrentUser(); 

  return (
    <header className="bg-background shadow-sm p-3 md:p-4 flex justify-between items-center border-b sticky top-0 z-10"> {/* Buat sticky */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden" 
        onClick={onToggleSidebar} 
      >
        <Menu className="w-6 h-6" />
        <span className="sr-only">Toggle Sidebar</span>
      </Button>

      <h2 className="text-base md:text-lg font-semibold hidden md:block flex-grow pl-4">Dashboard</h2>
      <div className="md:hidden flex-grow"></div>

      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline">{user?.name?.split(' ')[0] ?? 'Account'}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
             {user && (
                 <>
                    <DropdownMenuLabel className="font-normal">
                       <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.name}</p>
                          <p className="text-xs leading-none text-muted-foreground">
                             {user.email}
                          </p>
                       </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                 </>
             )}
            <DropdownMenuItem onClick={async () => await logoutAction()} className="cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;