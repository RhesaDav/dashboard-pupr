"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname()

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
      <Button onClick={() => router.push(`${pathname}/create`)} variant="outline">Create Data Contract</Button>
    </div>
  );
}
