"use server";

import { prisma } from "@/lib/prisma";
import {
  hashPassword,
  comparePassword,
  createToken,
  refreshToken,
  verifyToken,
} from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded: any = await verifyToken(token);
    const user = await prisma.user.findUnique({
      where: { id: decoded?.id },
    });

    return user;
  } catch (error) {
    console.error("Failed to get current user:", error);
    return null;
  }
}

export async function registerAction(formData: FormData) {
  const cookiesHeaders = await cookies();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });

    const token = await createToken({
      id: user.id,
      role: user.role,
    });

    cookiesHeaders.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return { message: "Registration success" };
  } catch (error) {
    console.log(error);
    return { error: "Registration failed" };
  } finally {
    redirect("/dashboard/home");
  }
}

export async function loginAction(formData: FormData) {
  const cookiesHeaders = await cookies();
  const emailOrName = formData.get("email") as string;
  const password = formData.get("password") as string;
  const budgetYear = formData.get("budgetYear") as string;

  try {
    let user = await prisma.user.findUnique({
      where: { email: emailOrName },
    });

    if (!user) {
      user = await prisma.user.findFirst({
        where: { name: emailOrName },
      });
    }

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoggedIn: new Date(),
      },
    });

    const token = await createToken({
      id: user.id,
      role: user.role,
      budgetYear: parseInt(budgetYear, 10),
    });

    cookiesHeaders.set("session", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      secure: false
    });

    cookiesHeaders.set("budgetYear", budgetYear, {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production",
      secure: false
    });

    return {
      message: "Login success",
      role: user.role,
      budgetYear: parseInt(budgetYear, 10),
    };
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  }
}

export async function logoutAction() {
  const cookiesHeaders = await cookies();
  cookiesHeaders.delete("session");
  cookiesHeaders.delete("budgetYear");
  redirect("/signin");
}

export async function refreshTokenAction() {
  const cookiesHeaders = await cookies();
  const oldToken = cookiesHeaders.get("session")?.value;

  if (!oldToken) {
    return { success: false };
  }

  const newToken = await refreshToken(oldToken);

  if (newToken) {
    cookiesHeaders.set("session", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return { success: true };
  }

  return { success: false };
}
