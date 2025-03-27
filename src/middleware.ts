import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export default auth((req) => {
  const user = req.auth?.user
  // const isProtectedRoute = req.nextUrl.pathname.startsWith('/dashboard')

  if (!user) {
    return NextResponse.redirect(new URL('/signin', req.url))
  }

  // if (isProtectedRoute) {
  //   const rolePathMap = {
  //     ADMIN: '/dashboard/admin',
  //     MANAGER: '/dashboard/manager',
  //     SALES: '/dashboard/sales',
  //     SUPPORT: '/dashboard/support',
  //     USER: '/dashboard/user'
  //   }

  //   const allowedPath = rolePathMap[user?.role]
  //   const currentPath = req.nextUrl.pathname

  //   if (!currentPath.startsWith(allowedPath)) {
  //     return NextResponse.redirect(new URL(allowedPath, req.url))
  //   }
  // }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*']
}
