"use server";

import { prisma } from "@/lib/prisma";
import { hashPassword, comparePassword, createToken, refreshToken, verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;

  if (!token) {
    return null;
  }

  try {
    const decoded:any = await verifyToken(token);
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
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Invalid credentials" };
    }

    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      return { error: "Invalid credentials" };
    }

    const token = await createToken({
      id: user.id,
      role: user.role,
    });

    cookiesHeaders.set("session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    return { message: "Login success" };
  } catch (error) {
    console.log(error);
    return { error: "Login failed" };
  } finally {
    redirect("/dashboard/home");
  }
}

export async function logoutAction() {
  const cookiesHeaders = await cookies();
  cookiesHeaders.delete("session");
  redirect("/signin");
}

export async function refreshTokenAction() {
  const cookiesHeaders = await cookies()
  const oldToken = cookiesHeaders.get('session')?.value

  if (!oldToken) {
    return { success: false }
  }

  const newToken = await refreshToken(oldToken)

  if (newToken) {
    // Set token baru
    cookiesHeaders.set('session', newToken, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production' 
    })

    return { success: true }
  }

  return { success: false }
}

