"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LuLoader } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Schema validasi dengan Zod
const SignInSchema = z.object({
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type SignInFormData = z.infer<typeof SignInSchema>;

function SignInForm() {
    const router = useRouter()
  const [loading, setLoading] = useState(false);
  const form = useForm<SignInFormData>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormData) => {
    // setLoading(true);
    // console.log("Form Data:", values);
    // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulasi request API
    // setLoading(false);
    const result = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password
    })
    if (result?.ok) {
      router.push("/dashboard/home")
    }

    if (result?.error) {
      console.log("Login gagal. Periksa email dan password Anda.")
    }

  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button type="submit" className="w-full flex items-center justify-center gap-2" disabled={loading}>
              {loading && <LuLoader className="w-4 h-4 animate-spin" />}
              Sign In
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default SignInForm;
