"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserSchema, UpdateUserType } from "@/schemas/userSchemas";
import { updateUser } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { User, Role } from "@prisma/client";
import { Loader, LucideEdit } from "lucide-react";
import bcrypt from "bcryptjs";
import { z } from "zod";

export default function EditUserDialog({ user }: { user: User }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<UpdateUserType>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      id: user.id,
      email: user.email || "",
      name: user.name || "",
      role: user.role || Role.CONSULTANT,
      password: "",
    },
  });

  const onSubmit = async (values: UpdateUserType) => {
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append("id", values.id);
      formData.append("email", values.email);
      
      if (values.password) {
        // const salt = await bcrypt.genSalt(10);
        // const hashedPassword = await bcrypt.hash(values.password, salt);
        formData.append("password", values.password);
      }
      
      if (values.name) formData.append("name", values.name);
      formData.append("role", values.role);

      const res = await updateUser(formData);

      if (res.success) {
        toast.success("User updated successfully");
        form.reset();
        setOpen(false);
      } else {
        toast.error(res.error || "Failed to update user");
      }
    } catch (error) {
      console.error("Update error:", error);
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" aria-label="Edit user">
          <LucideEdit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              {...form.register("email")}
              disabled={loading}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="grid gap-2">
            <Label htmlFor="password">New Password (leave empty to keep current)</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              {...form.register("password")}
              disabled={loading}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          {/* Name Field */}
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              {...form.register("name")}
              disabled={loading}
            />
          </div>

          {/* Role Field */}
          <div className="grid gap-2">
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) => form.setValue("role", value as Role)}
              defaultValue={user.role}
              disabled={loading || user.role !== "SUPERADMIN"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(Role).map((role) => (
                  <SelectItem key={role} value={role}>
                    {role.charAt(0) + role.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
              Update User
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}