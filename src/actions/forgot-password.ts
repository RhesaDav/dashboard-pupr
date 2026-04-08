"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { randomBytes } from "crypto";
import { sendEmail } from "@/lib/mail";
import { z } from "zod";

const resetTokenSchema = z
  .object({
    email: z.string().email("Email tidak valid"),
    token: z.string().min(1, "Token tidak valid"),
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

function generateToken(length = 32) {
  return randomBytes(length).toString("hex");
}

export async function requestPasswordResetAction(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email) {
    return { error: "Email harus diisi" };
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        success: true,
        message: "Jika email terdaftar, instruksi reset password telah dikirim",
      };
    }

    const resetToken = generateToken();
    const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token: resetToken,
        expiresAt: resetTokenExpiry,
      },
    });

    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;

    await sendEmail({
      to: email,
      subject: "Reset Password Bina Marga",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background-color: #3b82f6; padding: 20px; text-align: center; color: white;">
            <h2>Bina Marga - Reset Password</h2>
          </div>
          <div style="padding: 20px; border: 1px solid #e5e7eb; border-top: none;">
            <p>Halo,</p>
            <p>Kami menerima permintaan untuk mengatur ulang password akun Bina Marga Anda.</p>
            <p>Silakan klik tautan di bawah ini untuk melanjutkan:</p>
            <p style="text-align: center;">
              <a 
                href="${resetUrl}" 
                style="display: inline-block; background-color: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;"
              >
                Reset Password
              </a>
            </p>
            <p>Tautan ini akan kedaluwarsa dalam 1 jam.</p>
            <p>Jika Anda tidak meminta reset password, abaikan email ini dan password Anda akan tetap sama.</p>
            <p>Terima kasih,<br>Tim Bina Marga</p>
          </div>
          <div style="background-color: #f3f4f6; padding: 10px; text-align: center; font-size: 12px; color: #6b7280;">
            Â© ${new Date().getFullYear()} Bina Marga. Hak cipta dilindungi.
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: "Jika email terdaftar, instruksi reset password telah dikirim",
    };
  } catch (error) {
    console.error("Password reset request error:", error);
    return { error: "Terjadi kesalahan sistem. Silakan coba lagi." };
  }
}

export async function validateResetTokenAction(email: string, token: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        passwordReset: {
          where: {
            token,
            expiresAt: {
              gt: new Date(),
            },
          },
        },
      },
    });

    if (!user || user.passwordReset.length === 0) {
      return {
        valid: false,
        message: "Token tidak valid atau telah kadaluarsa",
      };
    }

    return { valid: true };
  } catch (error) {
    console.error("Token validation error:", error);
    return {
      valid: false,
      message: "Terjadi kesalahan sistem. Silakan coba lagi.",
    };
  }
}

export async function resetPasswordAction(formData: FormData) {
  const email = formData.get("email") as string;
  const token = formData.get("token") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  try {
    const validationResult = resetTokenSchema.safeParse({
      email,
      token,
      password,
      confirmPassword,
    });

    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      return { error: formattedErrors._errors[0] || "Validasi gagal" };
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        passwordReset: {
          where: {
            token,
            expiresAt: {
              gt: new Date(),
            },
          },
        },
      },
    });

    if (!user || user.passwordReset.length === 0) {
      return { error: "Token tidak valid atau telah kadaluarsa" };
    }

    const resetRecord = user.passwordReset[0];

    // @ts-ignore - Better Auth types can sometimes be missing the 'admin' property in the server-side API inference
    const adminApi = auth.api.admin;
    
    if (!adminApi) {
      throw new Error("Better Auth Admin API is not initialized. Please check your plugin configuration.");
    }

    await adminApi.setUserPassword({
      body: {
        userId: user.id,
        newPassword: password,
      },
    });

    await prisma.passwordReset.deleteMany({
      where: { userId: user.id },
    });

    return {
      success: true,
      message:
        "Password berhasil diubah. Silakan masuk dengan password baru Anda.",
    };
  } catch (error) {
    console.error("Password reset error:", error);
    return { error: "Terjadi kesalahan sistem. Silakan coba lagi." };
  }
}
