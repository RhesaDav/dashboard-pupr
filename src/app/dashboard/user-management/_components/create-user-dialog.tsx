"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateUserSchema, CreateUserType } from "@/schemas/userSchemas";
import { createUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { Role } from "@prisma/client";
import { useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/hooks/useCurrentUser";

export default function CreateUserDialog() {
  const user = useCurrentUser()
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<CreateUserType>({
    resolver: zodResolver(CreateUserSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
      role: "CONSULTANT",
    },
  });

  const onSubmit = async (values: CreateUserType) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    if (values.name) formData.append("name", values.name);
    formData.append("role", values.role);

    const res = await createUser(formData);
    queryClient.refetchQueries({
      queryKey: ['users']
    })
    setLoading(false);

    if (res.success) {
      toast.success("User berhasil dibuat!");
      form.reset();
      setOpen(false);
    } else {
      toast.error(res.error || "Something wrong");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Buat User Baru</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Buat User Baru</DialogTitle>
          <DialogDescription>Masukkan informasi user baru.</DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              autoComplete="new-password"
              id="email"
              type="email"
              placeholder="you@example.com"
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              autoComplete="new-password"
              id="password"
              type="password"
              placeholder="••••••••"
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nama</Label>
            <Input
              id="name"
              type="text"
              placeholder="Nama lengkap"
              {...form.register("name")}
            />
          </div>

          {/* Role Field */}
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
            disabled={user.user?.role !== "SUPERADMIN"}
              value={form.watch("role")}
              onValueChange={(value) => form.setValue("role", value as Role)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Role).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && <Loader className="w-4 h-4 animate-spin" />}
              Buat User Baru
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
