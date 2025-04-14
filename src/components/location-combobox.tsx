"use client"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { getDistrik, getKota } from "@/actions/wilayah"
import { Label } from "./ui/label"

interface WilayahComboboxProps {
  onSelectionChange: (data: {
    kota?: string
    distrik?: string
  }) => void
  className?: string
  defaultValue?: {
    kota?: string
    distrik?: string
  }
  disabled?: boolean
  kotaPlaceholder?: string
  distrikPlaceholder?: string
  required?: boolean
  buttonVariant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  sizes?: {
    kota?: "sm" | "default" | "lg"
    distrik?: "sm" | "default" | "lg"
  }
  disableFieldSelection?: {
    kota?: boolean
    distrik?: boolean
  }
  layout?: "horizontal" | "vertical"
  gap?: "sm" | "md" | "lg"
  width?: "full" | "auto"
}

export function LocationCombobox({ 
  onSelectionChange, 
  className, 
  defaultValue = {},
  disabled = false,
  kotaPlaceholder = "Pilih Kota/Kabupaten...",
  distrikPlaceholder = "Pilih Distrik...",
  required = false,
  buttonVariant = "outline",
  sizes = {
    kota: "default",
    distrik: "default"
  },
  disableFieldSelection = {
    kota: false,
    distrik: false
  },
  layout = "horizontal",
  gap = "md",
  width = "full"
}: WilayahComboboxProps) {
  const [openKota, setOpenKota] = useState(false)
  const [openDistrik, setOpenDistrik] = useState(false)
  
  const [selectedKota, setSelectedKota] = useState<string | undefined>(defaultValue.kota)
  const [selectedDistrik, setSelectedDistrik] = useState<string | undefined>(defaultValue.distrik)
  const [kotaOptions, setKotaOptions] = useState<{value: string, label: string}[]>([])
  const [distrikOptions, setDistrikOptions] = useState<{value: string, label: string}[]>([])
  const [loading, setLoading] = useState({
    kota: false,
    distrik: false
  })

  // Load kota options on mount
  useEffect(() => {
    const loadKota = async () => {
      setLoading(prev => ({...prev, kota: true}))
      try {
        const data = await getKota()
        setKotaOptions(data)
      } catch (error) {
        console.error("Failed to load kota:", error)
      } finally {
        setLoading(prev => ({...prev, kota: false}))
      }
    }
    loadKota()
  }, [])

  // Load distrik options when kota is selected
  useEffect(() => {
    if (selectedKota) {
      const loadDistrik = async () => {
        setLoading(prev => ({...prev, distrik: true}))
        try {
          const data = await getDistrik(selectedKota)
          setDistrikOptions(data)
        } catch (error) {
          console.error("Failed to load distrik:", error)
        } finally {
          setLoading(prev => ({...prev, distrik: false}))
        }
      }
      loadDistrik()
    } else {
      setDistrikOptions([])
    }
  }, [selectedKota])

  // Initialize with default values if provided
  useEffect(() => {
    if (defaultValue && Object.keys(defaultValue).length > 0) {
      if (defaultValue.kota) {
        setSelectedKota(defaultValue.kota)
      }
      
      if (defaultValue.distrik && selectedKota) {
        setSelectedDistrik(defaultValue.distrik)
      }
      
      onSelectionChange({
        kota: defaultValue.kota,
        distrik: defaultValue.distrik
      })
    }
  }, [])

  const handleKotaSelect = (value: string) => {
    setSelectedKota(value)
    setSelectedDistrik(undefined)
    setOpenKota(false)
    onSelectionChange({ kota: value })
  }

  const handleDistrikSelect = (value: string) => {
    setSelectedDistrik(value)
    setOpenDistrik(false)
    onSelectionChange({ 
      kota: selectedKota,
      distrik: value 
    })
  }

  const getButtonSizeClass = (size?: string) => {
    switch (size) {
      case "sm": return "h-8 text-sm"
      case "lg": return "h-11 text-lg"
      default: return "h-10"
    }
  }

  const getGapClass = () => {
    switch (gap) {
      case "sm": return "gap-2"
      case "lg": return "gap-4"
      default: return "gap-3"
    }
  }

  const getWidthClass = () => {
    return width === "full" ? "w-full" : "w-auto"
  }

  return (
    <div className={cn(
      "flex",
      layout === "horizontal" ? "flex-row" : "flex-col",
      getGapClass(),
      getWidthClass(),
      className
    )}>
      {/* Kota Combobox */}
      <div className={`${width === "full" ? "w-full" : "min-w-[200px]"} space-y-2`}>
        <Label>Kota/Kabupaten</Label>
        <Popover open={openKota} onOpenChange={setOpenKota}>
          <PopoverTrigger asChild>
            <Button
              variant={buttonVariant}
              role="combobox"
              aria-expanded={openKota}
              className={cn(
                "w-full justify-between",
                getButtonSizeClass(sizes.kota),
                required && !selectedKota ? "border-red-500" : ""
              )}
              disabled={disabled || disableFieldSelection.kota || loading.kota}
              aria-required={required}
            >
              {loading.kota ? (
                "Memuat..."
              ) : selectedKota ? (
                kotaOptions.find((kota) => kota.value === selectedKota)?.label || kotaPlaceholder
              ) : (
                kotaPlaceholder
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Cari kota/kabupaten..." />
              <CommandEmpty>Kota tidak ditemukan</CommandEmpty>
              <CommandGroup>
                {kotaOptions.map((kota) => (
                  <CommandItem
                    key={kota.value}
                    value={kota.value}
                    onSelect={handleKotaSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedKota === kota.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {kota.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Distrik Combobox */}
      <div className={`${width === "full" ? "w-full" : "min-w-[200px]"} space-y-2`}>
        <Label>Distrik</Label>
        <Popover open={openDistrik} onOpenChange={setOpenDistrik}>
          <PopoverTrigger asChild disabled={!selectedKota || disabled || disableFieldSelection.distrik || loading.distrik}>
            <Button
              variant={buttonVariant}
              role="combobox"
              aria-expanded={openDistrik}
              className={cn(
                "w-full justify-between",
                getButtonSizeClass(sizes.distrik),
                required && selectedKota && !selectedDistrik ? "border-red-500" : ""
              )}
              aria-required={required && !!selectedKota}
            >
              {loading.distrik ? (
                "Memuat..."
              ) : selectedDistrik ? (
                distrikOptions.find((dist) => dist.value === selectedDistrik)?.label || distrikPlaceholder
              ) : (
                distrikPlaceholder
              )}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] p-0">
            <Command>
              <CommandInput placeholder="Cari distrik..." />
              <CommandEmpty>Distrik tidak ditemukan</CommandEmpty>
              <CommandGroup>
                {distrikOptions.map((distrik) => (
                  <CommandItem
                    key={distrik.value}
                    value={distrik.value}
                    onSelect={handleDistrikSelect}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedDistrik === distrik.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {distrik.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )  
}