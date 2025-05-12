"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Loader,
  Eye,
  EyeOff,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  resetPasswordAction,
  validateResetTokenAction,
} from "@/actions/forgot-password";

const ResetPasswordSchema = z
  .object({
    password: z.string().min(6, "Password minimal 6 karakter"),
    confirmPassword: z
      .string()
      .min(6, "Konfirmasi password minimal 6 karakter"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password dan konfirmasi password tidak cocok",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof ResetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [loading, setLoading] = useState(false);
  const [validatingToken, setValidatingToken] = useState(true);
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    async function validateToken() {
      if (!token || !email) {
        setIsTokenValid(false);
        setTokenError(
          "Parameter tidak valid. Silakan gunakan tautan dari email."
        );
        setValidatingToken(false);
        return;
      }

      try {
        const validationResult = await validateResetTokenAction(email, token);
        setIsTokenValid(validationResult.valid);

        if (!validationResult.valid) {
          setTokenError(
            validationResult.message ||
              "Token tidak valid atau telah kadaluarsa."
          );
        }
      } catch (error) {
        console.error("Token validation error:", error);
        setIsTokenValid(false);
        setTokenError("Terjadi kesalahan sistem. Silakan coba lagi.");
      } finally {
        setValidatingToken(false);
      }
    }

    validateToken();
  }, [token, email]);

  const onSubmit = async (values: ResetPasswordFormData) => {
    if (!token || !email) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("token", token);
      formData.append("password", values.password);
      formData.append("confirmPassword", values.confirmPassword);

      const res = await resetPasswordAction(formData);

      if (res.success) {
        setResetSuccess(true);
        toast.success("Password berhasil diubah!", {
          description: res.message,
          duration: 5000,
        });
      } else if (res.error) {
        setErrorMessage(res.error);
        toast.error("Reset password gagal", {
          description: res.error,
          duration: 4000,
        });
      }
    } catch (error) {
      console.error("Reset password system error:", error);
      setErrorMessage("Terjadi kesalahan sistem. Silakan coba lagi.");
      toast.error("Kesalahan Sistem", {
        description: "Mohon coba beberapa saat lagi",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-50 to-gray-100 flex items-center justify-center p-4 selection:bg-blue-500 selection:text-white">
      <div className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all hover:scale-[1.01] duration-300">
        {/* Header with Logo */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-center">
          <div className="flex justify-center mb-3">
            <Building2 className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Bina Marga
          </h1>
          <p className="text-blue-100 mt-1.5 text-sm">
            Sistem Manajemen Proyek
          </p>
        </div>

        <div className="p-8">
          {validatingToken ? (
            <div className="text-center py-8">
              <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600">Memvalidasi token...</p>
            </div>
          ) : resetSuccess ? (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Password Berhasil Diubah
              </h2>
              <p className="text-gray-600 mb-6">
                Password Anda telah berhasil diubah. Silakan masuk dengan
                password baru Anda.
              </p>
              <Button
                asChild
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
              >
                <Link href="/signin">Masuk</Link>
              </Button>
            </div>
          ) : !isTokenValid ? (
            <div className="text-center">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Token Tidak Valid
              </h2>
              <p className="text-gray-600 mb-6">
                {tokenError ||
                  "Token tidak valid atau telah kadaluarsa. Silakan meminta reset password baru."}
              </p>
              <Button
                asChild
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
              >
                <Link href="/forgot-password">Minta Reset Password Baru</Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-7">
                Reset Password
              </h2>

              {errorMessage && (
                <div className="mb-5 p-3.5 bg-red-50 text-red-700 border border-red-300 rounded-lg text-sm shadow-sm">
                  {errorMessage}
                </div>
              )}

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-gray-700 font-semibold text-sm">
                            Password Baru
                          </FormLabel>
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline"
                          >
                            {showPassword ? (
                              <span className="flex items-center gap-1.5">
                                <EyeOff className="w-4 h-4" /> Sembunyikan
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4" /> Tampilkan
                              </span>
                            )}
                          </button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="h-12 w-full pr-10 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm px-4 text-base transition-colors duration-150"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-600 pt-1" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="flex justify-between items-center">
                          <FormLabel className="text-gray-700 font-semibold text-sm">
                            Konfirmasi Password
                          </FormLabel>
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="text-xs text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline"
                          >
                            {showConfirmPassword ? (
                              <span className="flex items-center gap-1.5">
                                <EyeOff className="w-4 h-4" /> Sembunyikan
                              </span>
                            ) : (
                              <span className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4" /> Tampilkan
                              </span>
                            )}
                          </button>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showConfirmPassword ? "text" : "password"}
                              placeholder="••••••••"
                              className="h-12 w-full pr-10 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm px-4 text-base transition-colors duration-150"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage className="text-xs text-red-600 pt-1" />
                      </FormItem>
                    )}
                  />

                  <div className="pt-3">
                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-[0.98]"
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader className="w-5 h-5 animate-spin mr-2.5" />
                      ) : null}
                      {loading ? "Memproses..." : "Ubah Password"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600 mt-5">
                    <Link
                      href="/signin"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                    >
                      Kembali ke Halaman Login
                    </Link>
                  </div>
                </form>
              </Form>
            </>
          )}
        </div>

        <div className="bg-gray-50 px-6 py-5 text-center border-t border-gray-200">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bina Marga. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}
