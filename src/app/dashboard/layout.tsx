import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth"; // Sesuaikan path
import { TokenRefreshProvider } from "@/components/auth/TokenRefreshProvider"; // Sesuaikan path
import DashboardLayout from "@/components/layout/DashboardLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const cookiesHeaders = await cookies()
  const token = cookiesHeaders.get("session")?.value;

  if (!token) {
    redirect("/signin");
  }

  try {
      const payload = await verifyToken(token);
      if (!payload) {
         throw new Error("Invalid token payload");
      }
  } catch (error) {
      console.error("Token verification failed:", error);
      redirect("/signin");
  }


  return (
    <>
       <TokenRefreshProvider />
       <DashboardLayout>
           {children}
       </DashboardLayout>
    </>

  );
};

export default Layout;