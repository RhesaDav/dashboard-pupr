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
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { toast } from "sonner";
import { Loader, Eye, EyeOff, Building2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SignInSchema = z.object({
  email: z.string().min(1, "Email wajib diisi").email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type SignInFormData = z.infer<typeof SignInSchema>;

function SignInForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      formData.append("email", values.email);
      formData.append("password", values.password);

      const res = await loginAction(formData);

      if (!res?.error) {
        toast.success("Login berhasil!", {
          description: "Selamat datang di Sistem Bina Marga",
        });
        if (res.role === "CONSULTANT") {
          router.push("/dashboard/contracts");
        } else {
          router.push("/dashboard/home");
        }
      } else {
        setErrorMessage(res.error);
        toast.error("Login gagal", {
          description: res.error || "Periksa kembali email dan password Anda",
        });
      }
    } catch (error) {
      setErrorMessage("Terjadi kesalahan sistem. Silakan coba lagi.");
      toast.error("Kesalahan Sistem", {
        description: "Mohon coba beberapa saat lagi",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header with Logo */}
        <div className="bg-blue-600 p-6 text-center">
          <div className="flex justify-center mb-4">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white">Bina Marga</h1>
          <p className="text-blue-100 mt-1">Sistem Manajemen Proyek</p>
        </div>

        <div className="p-8">
          <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">
            Masuk ke Akun Anda
          </h2>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
              {errorMessage}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@binamarga.go.id"
                        className="h-11"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-blue-600 hover:text-blue-800"
                      >
                        {showPassword ? (
                          <span className="flex items-center gap-1">
                            <EyeOff className="w-4 h-4" /> Sembunyikan
                          </span>
                        ) : (
                          <span className="flex items-center gap-1">
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
                          className="h-11 pr-10"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="w-4 h-4 animate-spin mr-2" />
                  ) : null}
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-4">
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Lupa password?
                </Link>
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-gray-50 px-6 py-4 text-center border-t">
          <p className="text-xs text-gray-500">
            {/* © {new Date().getFullYear()} Bina Marga. Hak cipta dilindungi. */}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;