"use server";

import { prisma } from "@/lib/prisma";
import {
  CreateUserSchema,
  UpdateUserSchema,
  UserIdSchema,
} from "@/schemas/userSchemas";
import { Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

export const createUser = async (formData: FormData) => {
  try {
    const data = Object.fromEntries(formData.entries());

    const validatedData = CreateUserSchema.parse(data);

    const checkUser = await prisma.user.findFirst({
      where: {
        email: validatedData.email
      }
    })

    if (checkUser) {
      return {
        success: false,
        error: "Email registered"
      }
    }

    const newUser = await prisma.user.create({
      data: {
        ...validatedData,
        password: await bcrypt.hash(validatedData.password, 10)
      },
    });

    revalidatePath("/dashboard/user-management","page")

    return { success: true, user: newUser };
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

export const getAllUsers = async (
  page = 1,
  limit = 10,
  search = "",
) => {
  try {
    const skip = (page - 1) * limit;
    
    const searchCondition: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
            { email: { contains: search, mode: 'insensitive' as Prisma.QueryMode } },
          ],
        }
      : {};
    
    const users = await prisma.user.findMany({
      where: searchCondition,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
    
    const totalUsers = await prisma.user.count({
      where: searchCondition,
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
      error: "Something wrong",
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

    const updatedUser = await prisma.user.update({
      where: { id: validatedData.id },
      data: {
        ...validatedData,
        password: await bcrypt.hash(validatedData.password, 10)
      },
    });

    revalidatePath("/dashboard/user-management","page")

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

    return { success: false, error: "Something wrong" };
  }
};

export const deleteUser = async (id: string) => {
  console.log(id)
  try {
    const validatedId = UserIdSchema.parse({ id });

    await prisma.user.delete({
      where: { id: validatedId.id },
    });

    revalidatePath("/dashboard/user-management","page")

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
