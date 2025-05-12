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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { toast } from "sonner";
import { Loader, Eye, EyeOff, Building2, CalendarDays } from "lucide-react"; // Menambahkan CalendarDays untuk ikon
import Link from "next/link";
// import Image from "next/image"; // Komentar ini bisa dihapus jika Image tidak jadi digunakan

const currentYear = new Date().getFullYear();
const yearOptions = [currentYear - 4, currentYear - 3, currentYear - 2, currentYear - 1, currentYear, currentYear + 1].sort((a,b) => b-a); // Mengurutkan tahun dari terbaru

const SignInSchema = z.object({
  budgetYear: z.string().min(1, "Tahun anggaran wajib dipilih"), // Dipindahkan ke atas
  emailOrName: z.string().min(1, "Email atau Nama wajib diisi"),
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
      budgetYear: currentYear.toString(), // Default tetap tahun sekarang
      emailOrName: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormData) => {
    setLoading(true);
    setErrorMessage(null);

    try {
      const formData = new FormData();
      // Urutan append disesuaikan dengan urutan field di skema (opsional, tapi baik untuk konsistensi)
      formData.append("budgetYear", values.budgetYear);
      formData.append("email", values.emailOrName);
      formData.append("password", values.password);

      const res = await loginAction(formData);

      if (!res?.error) {
        toast.success("Login berhasil!", {
          description: "Selamat datang di Sistem Bina Marga",
          duration: 3000,
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
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("Login system error:", error); // Log error untuk debugging
      setErrorMessage("Terjadi kesalahan sistem. Silakan coba lagi.");
      toast.error("Kesalahan Sistem", {
        description: "Mohon coba beberapa saat lagi",
        duration: 3000,
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
          <div className="flex justify-center mb-3"> {/* Margin bottom dikurangi sedikit */}
            <Building2 className="h-12 w-12 text-white" /> {/* Ukuran ikon diperbesar */}
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Bina Marga</h1> {/* Ukuran font & tracking */}
          <p className="text-blue-100 mt-1.5 text-sm">Sistem Manajemen Proyek</p> {/* Margin top & ukuran font disesuaikan */}
        </div>

        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-7"> {/* Ukuran font & margin bottom */}
            Masuk ke Akun Anda
          </h2>

          {errorMessage && (
            <div className="mb-5 p-3.5 bg-red-50 text-red-700 border border-red-300 rounded-lg text-sm shadow-sm"> {/* Styling pesan error ditingkatkan */}
              {errorMessage}
            </div>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6"> {/* Jarak antar field ditambah */}
              {/* FormField untuk Tahun Anggaran (dipindahkan ke atas dan diberi style) */}
              <FormField
                control={form.control}
                name="budgetYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-sm">Tahun Anggaran</FormLabel> {/* Font lebih tebal & kecil */}
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="h-12 w-full border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm text-base transition-colors duration-150">
                          <div className="flex items-center">
                            <CalendarDays className="mr-2.5 h-5 w-5 text-gray-500" />
                            <SelectValue placeholder="Pilih Tahun Anggaran" />
                          </div>
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-white border-gray-300 rounded-lg shadow-xl py-1"> {/* Padding vertikal */}
                        {yearOptions.map((year) => (
                          <SelectItem
                            key={year}
                            value={year.toString()}
                            className="hover:bg-blue-50 text-gray-700 cursor-pointer py-2.5 px-4 text-sm transition-colors duration-100" // Padding & ukuran font
                          >
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs text-red-600 pt-1" /> {/* Padding top */}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="emailOrName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-semibold text-sm">Email atau Nama Pengguna</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="contoh@email.com atau nama.pengguna"
                        className="h-12 w-full border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm px-4 text-base transition-colors duration-150" // Padding horizontal & ukuran font
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-700 font-semibold text-sm">Password</FormLabel>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline" // Styling tombol show/hide
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
                          className="h-12 w-full pr-10 border-gray-300 hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg shadow-sm px-4 text-base transition-colors duration-150" // Padding horizontal & ukuran font
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage className="text-xs text-red-600 pt-1" />
                  </FormItem>
                )}
              />

              <div className="pt-3"> {/* Padding top untuk tombol */}
                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition-all duration-150 ease-in-out transform active:scale-[0.98]"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader className="w-5 h-5 animate-spin mr-2.5" />
                  ) : null}
                  {loading ? "Memproses..." : "Masuk"}
                </Button>
              </div>

              <div className="text-center text-sm text-gray-600 mt-5"> {/* Margin top */}
                <Link
                  href="/forgot-password"
                  className="text-blue-600 hover:text-blue-700 hover:underline font-medium"
                >
                  Lupa password?
                </Link>
              </div>
            </form>
          </Form>
        </div>

        <div className="bg-gray-50 px-6 py-5 text-center border-t border-gray-200"> {/* Padding & border */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Bina Marga. Hak cipta dilindungi.
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;