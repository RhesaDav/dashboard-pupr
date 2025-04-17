"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CreateUserDialog from "./create-user-dialog";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    params.set("search", e.target.value);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-between gap-4 mb-4">
      <Input
        placeholder="Search..."
        defaultValue={searchParams.get("search") || ""}
        onChange={handleSearch}
        className="max-w-sm"
      />
      <CreateUserDialog />
    </div>
  );
}
