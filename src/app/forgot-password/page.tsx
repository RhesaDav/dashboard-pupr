"use client";

import { useState } from "react";
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
import { Loader, ArrowLeft, Building2, Mail } from "lucide-react";
import Link from "next/link";
import { requestPasswordResetAction } from "@/actions/forgot-password";

const ForgotPasswordSchema = z.object({
  email: z.string().email("Email tidak valid").min(1, "Email wajib diisi"),
});

type ForgotPasswordFormData = z.infer<typeof ForgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", values.email);

      const res = await requestPasswordResetAction(formData);

      if (res.success) {
        setEmailSent(true);
        toast.success("Permintaan terkirim!", {
          description: res.message,
          duration: 5000,
        });
      } else if (res.error) {
        setErrorMessage(res.error);
        toast.error("Permintaan gagal", {
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
          <h1 className="text-3xl font-bold text-white tracking-tight">Bina Marga</h1>
          <p className="text-blue-100 mt-1.5 text-sm">Sistem Manajemen Proyek</p>
        </div>

        <div className="p-8">
          {emailSent ? (
            <div className="text-center">
              <Mail className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Email Terkirim</h2>
              <p className="text-gray-600 mb-6">
                Jika email terdaftar dalam sistem kami, instruksi untuk reset password
                telah dikirim. Silakan periksa kotak masuk email Anda dan ikuti petunjuk.
              </p>
              <Button
                asChild
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out"
              >
                <Link href="/signin">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Kembali ke Halaman Login
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-800 text-center mb-7">
                Lupa Password
              </h2>

              <p className="text-gray-600 mb-6 text-center">
                Masukkan email Anda dan kami akan mengirimkan tautan untuk reset password.
              </p>

              {errorMessage && (
                <div className="mb-5 p-3.5 bg-red-50 text-red-700 border border-red-300 rounded-lg text-sm shadow-sm">
                  {errorMessage}
                </div>
              )}

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold text-sm">Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="nama@email.com"
                            className="h-12 w-full border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm px-4 text-base transition-colors duration-150"
                            {...field}
                          />
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
                      {loading ? "Memproses..." : "Kirim Tautan Reset"}
                    </Button>
                  </div>

                  <div className="text-center text-sm text-gray-600 mt-5">
                    <Link
                      href="/signin"
                      className="text-blue-600 hover:text-blue-700 hover:underline font-medium flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
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