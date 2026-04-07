import { ReactNode } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { TokenRefreshProvider } from "@/components/auth/TokenRefreshProvider"; // Sesuaikan path
import DashboardLayout from "@/components/layout/DashboardLayout";

interface LayoutProps {
  children: ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({ headers: reqHeaders });

  if (!session) {
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
