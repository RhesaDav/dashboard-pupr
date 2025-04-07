// components/ui/input-currency.tsx
"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";

interface InputCurrencyProps extends React.ComponentProps<"input"> {
  value: number | string;
  onValueChange: (value: number) => void;
}

export function InputCurrency({
  value,
  onValueChange,
  ...props
}: InputCurrencyProps) {
  const [displayValue, setDisplayValue] = useState("");

  // Format number to IDR currency string
  const formatToIDR = (num: number): string => {
    return new Intl.NumberFormat("id-ID").format(num);
  };

  // Parse IDR currency string to number
  const parseFromIDR = (str: string): number => {
    return Number(str.replace(/\./g, ""));
  };

  useEffect(() => {
    // Initialize display value
    const numValue = typeof value === "string" ? parseFloat(value) || 0 : value;
    setDisplayValue(formatToIDR(numValue));
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = rawValue.replace(/[^\d]/g, "");
    const numValue = digitsOnly ? parseInt(digitsOnly, 10) : 0;
    
    // Update display value with formatting
    setDisplayValue(formatToIDR(numValue));
    // Pass numeric value to parent
    onValueChange(numValue);
  };

  return (
    <Input
      {...props}
      value={displayValue}
      onChange={handleChange}
      onBlur={() => {
        const numValue = parseFromIDR(displayValue);
        setDisplayValue(formatToIDR(numValue));
      }}
    />
  );
}