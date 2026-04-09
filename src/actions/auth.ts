"use server";

import { auth } from "@/lib/auth";
import { headers, cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

/**
 * Mendapatkan user yang sedang login berdasarkan session Better Auth.
 * @returns {Promise<object|null>} User object atau null jika tidak ada session.
 */
export async function getCurrentUser() {
  const reqHeaders = await headers();
  try {
    const session = await auth.api.getSession({ headers: reqHeaders });
    
    if (!session?.user) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

/**
 * Logout user.
 * @returns {Promise<void>}
 */
export async function logoutAction() {
  const cookiesHeaders = await cookies();
  cookiesHeaders.delete("budgetYear");
  // The actual logout from Better Auth should be handled on the client side using signOut()
  // But we keep this for server-side redirects or cookie clearing if called from a server component
  redirect("/signin");
}

/**
 * Resolves an identifier (email or name) to a valid email for Better Auth sign-in.
 * If the identifier is not a valid email, it searches for a user by name.
 */
export async function resolveIdentifierAction(identifier: string) {
  // Simple regex for email validation
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  
  if (isEmail) {
    return { email: identifier, success: true };
  }

  try {
    const user = await prisma.user.findFirst({
      where: { name: identifier },
      select: { email: true }
    });

    if (user) {
      return { email: user.email, success: true };
    }

    return { error: "User tidak ditemukan", success: false };
  } catch (error) {
    console.error("Resolution error:", error);
    return { error: "Terjadi kesalahan saat mencari user", success: false };
  }
}
