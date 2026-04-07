"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { Role } from "@/generated/prisma";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserIdSchema,
} from "@/schemas/userSchemas";
import { Prisma } from "../generated/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { getCurrentUser } from "./auth";

export const createUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedData = CreateUserSchema.parse(data);

    const checkUser = await prisma.user.findFirst({
      where: {
        email: validatedData.email,
      },
    });

    if (checkUser) {
      return {
        success: false,
        error: "Email registered",
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
  } catch (error) {
    console.error("Error in createUser:", error);
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something wrong" };
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
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }

    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: "Something went wrong",
    };
  }
};

export const getUserById = async (id: string) => {
  try {
    const validatedId = UserIdSchema.parse({ id });

    const user = await prisma.user.findUnique({
      where: { id: validatedId.id },
    });

    if (!user) return { success: false, error: "User not found" };

    return { success: true, user };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something wrong" };
  }
};

export const updateUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedData = UpdateUserSchema.parse(data);

    const currentUser = await prisma.user.findUnique({
      where: { id: validatedData.id },
    });

    if (!currentUser) {
      return { success: false, error: "User not found" };
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
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Something went wrong" };
  }
};

export const deleteUser = async (id: string) => {
  console.log(id);
  try {
    const validatedId = UserIdSchema.parse({ id });

    await prisma.user.delete({
      where: { id: validatedId.id },
    });

    revalidatePath("/dashboard/user-management", "page");

    return { success: true, message: "User deleted successfully" };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.errors.map((err) => err.message).join(", "),
      };
    }
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return { success: false, error: "Something wrong" };
  }
};
