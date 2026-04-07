"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserIdSchema,
} from "@/schemas/userSchemas";
import { handlePrismaError, validateSchema } from "@/lib/utils";
import { getCurrentUser } from "./auth";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { Prisma } from "@/generated/prisma";
import { ZodError } from "zod";

export const createUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedData = await validateSchema(CreateUserSchema, data);

    const checkUser = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
      },
    });

    if (checkUser) {
      return {
        success: false,
        error: "Email sudah terdaftar",
      };
    }

    console.log("Creating user...", validatedData.email);
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        role: validatedData.role,
        accounts: {
          create: {
            id: crypto.randomUUID(),
            accountId: validatedData.email,
            providerId: "credential",
            password: await bcrypt.hash(validatedData.password, 10),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        },
      },
    });

    revalidatePath("/dashboard/user-management", "page");

    return { success: true, user: newUser };
  } catch (error: any) {
    console.error("Error in createUser:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal membuat user",
      };
    }
  }
};

export const getAllUsers = async (filterParams: any = {}) => {
  try {
    const filter = {
      page: 1,
      limit: 10,
      ...filterParams,
    };
    const { page, limit, search } = filter;
    const skip = (page - 1) * limit;

    const currentUser = await getCurrentUser();
    if (!currentUser) {
      return { success: false, error: "Unauthorized" };
    }

    const baseSearchCondition: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    let roleCondition: Prisma.UserWhereInput = {};

    if (currentUser.role !== "SUPERADMIN") {
      roleCondition = {
        role: { notIn: ["SUPERADMIN", "ADMIN"] },
      };
    }

    const whereCondition: Prisma.UserWhereInput = {
      ...baseSearchCondition,
      ...roleCondition,
    };

    const users = await prisma.user.findMany({
      where: whereCondition,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const totalUsers = await prisma.user.count({
      where: whereCondition,
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return {
      success: true,
      users,
      pagination: {
        total: totalUsers,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    };
  } catch (error: any) {
    console.error("Error in getAllUsers:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal memuat daftar user",
      };
    }
  }
};

export const getUserById = async (id: string) => {
  try {
    const validatedId = await validateSchema(UserIdSchema, { id });

    const user = await prisma.user.findUnique({
      where: { id: validatedId.id },
    });

    if (!user) return { success: false, error: "User tidak ditemukan" };

    return { success: true, user };
  } catch (error: any) {
    console.error("Error in getUserById:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal memuat detail user",
      };
    }
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedData = await validateSchema(UpdateUserSchema, data);

    const currentUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!currentUser) {
      return { success: false, error: "User tidak ditemukan" };
    }

    const updateData: any = {
      email: validatedData.email,
      name: validatedData.name,
      role: validatedData.role,
    };

    const updatedUser = await prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: validatedData.id },
        data: updateData,
      });

      if (validatedData.password) {
        // @ts-ignore - Better Auth types can sometimes be missing the 'admin' property in the server-side API inference
        await auth.api.admin.setUserPassword({
          body: {
            userId: validatedData.id,
            newPassword: validatedData.password,
          },
        });
      }

      return user;
    });

    revalidatePath("/dashboard/user-management", "page");

    return { success: true, user: updatedUser };
  } catch (error: any) {
    console.error("Error in updateUser:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal memperbarui user",
      };
    }
  }
};

export const deleteUser = async (id: string) => {
  console.log(id);
  try {
    const validatedId = await validateSchema(UserIdSchema, { id });

    await prisma.user.delete({
      where: { id: validatedId.id },
    });

    revalidatePath("/dashboard/user-management", "page");

    return { success: true, message: "User berhasil dihapus" };
  } catch (error: any) {
    console.error("Error in deleteUser:", error);
    try {
      handlePrismaError(error);
    } catch (e: any) {
      return {
        success: false,
        error: e.message || "Gagal menghapus user",
      };
    }
  }
};
