import { ReactNode } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import { TokenRefreshProvider } from "@/components/auth/TokenRefreshProvider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const cookiesHeaders = await cookies()
  const token = cookiesHeaders.get('session')?.value

  if (!token) {
    redirect('/signin')
  }

  const payload = await verifyToken(token)

  if (!payload) {
    redirect('/signin')
  }

  return (
    <div className="flex min-h-screen bg-muted/30">
      <TokenRefreshProvider/>
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
