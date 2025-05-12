"use client";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Plus, Trash2, Calendar, Info } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { v4 as uuidv4 } from "uuid";
import { cn, romanize } from "@/lib/utils";
import { DatePicker } from "@/components/ui/datepicker";
import { Addendum } from "@prisma/client";
import { addDays, format } from "date-fns";

const Divider = ({ className }: { className?: string }) => (
  <div className={cn("h-px bg-slate-200", className)} />
);

const ADDENDUM_TYPES = [
  { value: "waktu", label: "Perubahan Waktu" },
  { value: "volume", label: "Perubahan Volume" },
];

export default function AddendumStep() {
  const form = useFormContext();
  console.log(form.getValues("addendum"));

  const [addendumItems, setAddendumItems] = useState<Partial<Addendum>[]>(
    () => {
      const currentAddendum = form.getValues("addendum") || [];
      const hasAddendum = form.getValues("hasAddendum");

      if (currentAddendum.length > 0) {
        return currentAddendum;
      } else if (hasAddendum) {
        return [
          {
            id: uuidv4(),
            name: "",
            tipe: "",
            tanggalAddendum: null,
            hari: "",
            volume: "",
            satuan: "",
            alasan: "",
            pemberianKesempatan: false,
          },
        ];
      } else {
        return [];
      }
    }
  );

  useEffect(() => {
    if (form.getValues("hasAddendum")) {
      form.setValue("addendum", addendumItems, { shouldDirty: true });
    }
  }, [addendumItems]);

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "hasAddendum") {
        if (value.hasAddendum && addendumItems.length === 0) {
          setAddendumItems([
            {
              id: uuidv4(),
              name: "",
              tipe: "",
              hari: "",
              volume: "",
              satuan: "",
              pemberianKesempatan: false,
            },
          ]);
        } else if (!value.hasAddendum) {
          setAddendumItems([]);
          form.setValue("addendum", [], { shouldDirty: true });
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form, addendumItems.length]);

  const addAddendumItem = () => {
    setAddendumItems([
      ...addendumItems,
      {
        id: uuidv4(),
        name: "",
        tipe: "",
        hari: "",
        volume: "",
        satuan: "",
        pemberianKesempatan: false,
      },
    ]);
  };

  const removeAddendumItem = (index: number) => {
    const updatedItems = [...addendumItems];
    updatedItems.splice(index, 1);
    setAddendumItems(updatedItems);
  };

  const updateAddendumItem = <K extends keyof Addendum>(
    index: number,
    field: K,
    value: Addendum[K]
  ) => {
    const updatedItems = [...addendumItems];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };
    setAddendumItems(updatedItems);
  };

  return (
    <div className="space-y-6">
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 rounded-t-lg border-b p-4">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            Masa Kontrak
            <Badge variant="secondary" className="px-3 py-1 font-normal">
              {form.watch("masaPelaksanaan") +
                (form
                  .watch("addendum")
                  ?.reduce(
                    (acc: number, item: Partial<Addendum>) =>
                      acc + Number(item.hari || 0),
                    0
                  ) || 0)}{" "}
              Hari
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            {/* Akhir Kontrak Asli */}
            <div className="grid grid-cols-12 gap-4 items-center text-sm">
              <div className="col-span-4 font-medium text-gray-600">
                Akhir Kontrak Asli
              </div>
              <div className="col-span-5 text-gray-800">
                {form.watch("tanggalKontrak")
                  ? format(
                      addDays(
                        form.watch("tanggalKontrak"),
                        form.watch("masaPelaksanaan") || 0
                      ),
                      "dd MMMM yyyy"
                    )
                  : "-"}
              </div>
              <div className="col-span-3 text-right">
                <Badge variant="outline" className="font-normal">
                  {1 + form.watch("masaPelaksanaan") || "0"} Hari
                </Badge>
              </div>
            </div>

            {/* Akhir Kontrak Addendum (Waktu, Non-Kesempatan) */}
            {form
              .watch("addendum")
              ?.filter((item: Partial<Addendum>) => !item.pemberianKesempatan)
              .map(
                (
                  item: Partial<Addendum>,
                  index: number,
                  array: Partial<Addendum>[]
                ) => {
                  const totalDays =
                    (form.watch("masaPelaksanaan") || 0) +
                    array
                      .slice(0, index + 1)
                      .reduce(
                        (acc: number, item: Partial<Addendum>) =>
                          acc + Number(item.hari || 0),
                        0
                      );

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 items-center text-sm"
                    >
                      <div className="col-span-4 font-medium text-gray-600">
                        Akhir Kontrak ADD {romanize(index + 1)}
                      </div>
                      <div className="col-span-5 text-gray-800">
                        {form.watch("tanggalKontrak")
                          ? format(
                              addDays(form.watch("tanggalKontrak"), totalDays),
                              "dd MMMM yyyy"
                            )
                          : "-"}
                      </div>
                      <div className="col-span-3 text-right">
                        <Badge variant="outline" className="font-normal">
                          {item.hari} Hari
                        </Badge>
                      </div>
                    </div>
                  );
                }
              )}

            {/* Divider ketika ada addendum pemberian kesempatan */}
            {form
              .watch("addendum")
              ?.some((item: Partial<Addendum>) => item.pemberianKesempatan) && (
              <Divider className="my-3" />
            )}

            {/* Addendum Pemberian Kesempatan */}
            {form
              .watch("addendum")
              ?.filter((item: Partial<Addendum>) => item.pemberianKesempatan)
              .map(
                (
                  item: Partial<Addendum>,
                  index: number,
                  array: Partial<Addendum>[]
                ) => {
                  const totalNonKesempatanDays =
                    (form.watch("masaPelaksanaan") || 0) +
                    (form.watch("addendum") ?? [])
                      .filter(
                        (add: Partial<Addendum>) => !add.pemberianKesempatan
                      )
                      .reduce(
                        (acc: number, add: Partial<Addendum>) =>
                          acc + Number(add.hari || 0),
                        0
                      );

                  const totalDays =
                    totalNonKesempatanDays +
                    array
                      .slice(0, index + 1)
                      .reduce(
                        (acc: number, add: Partial<Addendum>) =>
                          acc + Number(add.hari || 0),
                        0
                      );

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-12 gap-4 items-center text-sm bg-gray-50 p-3 rounded-md"
                    >
                      <div className="col-span-4 font-medium text-gray-600">
                        Pemberian Kesempatan {romanize(index + 1)}
                      </div>
                      <div className="col-span-5 text-gray-800">
                        {form.watch("tanggalKontrak")
                          ? format(
                              addDays(form.watch("tanggalKontrak"), totalDays),
                              "dd MMMM yyyy"
                            )
                          : "-"}
                      </div>
                      <div className="col-span-3 text-right">
                        <Badge
                          variant="outline"
                          className="bg-white font-normal"
                        >
                          {item.hari} Hari
                        </Badge>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 rounded-t-lg border-b">
          <CardTitle className="text-lg font-medium flex items-center">
            <div className="flex items-center space-x-2">
              <FormField
                control={form.control}
                name="hasAddendum"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-blue-600"
                      />
                    </FormControl>
                    <FormLabel className="font-medium cursor-pointer m-0">
                      Proyek Memiliki Addendum
                    </FormLabel>
                  </FormItem>
                )}
              />

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info size={16} className="text-slate-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>
                      Addendum adalah perubahan atau tambahan terhadap kontrak
                      asli yang disepakati oleh para pihak setelah kontrak
                      ditandatangani.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="pt-4">
          {form.watch("hasAddendum") && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-base font-medium">Daftar Addendum</h3>
                  {addendumItems.length > 0 && (
                    <p className="text-sm text-slate-500 mt-1">
                      Terdapat {addendumItems.length} addendum pada proyek ini
                    </p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addAddendumItem}
                  className="border-blue-500 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Tambah Addendum
                </Button>
              </div>

              {addendumItems.length === 0 ? (
                <div className="text-center py-8 border border-dashed rounded-md bg-slate-50">
                  <p className="text-slate-500">
                    Belum ada addendum yang ditambahkan
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addAddendumItem}
                    className="mt-2 border-blue-500 text-blue-600 hover:bg-blue-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Addendum
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {addendumItems.map((item, index) => (
                    <Card
                      key={item.id}
                      className={cn(
                        "border rounded-md overflow-hidden",
                        !item.name && !item.tipe
                          ? "border-orange-200 bg-orange-50"
                          : "border-slate-200"
                      )}
                    >
                      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-slate-50 border-b">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-slate-700">
                            {item.name ? item.name : `Addendum #${index + 1}`}
                          </h4>
                          {item.tipe && (
                            <Badge
                              variant="outline"
                              className={cn(
                                "text-xs py-0 h-5",
                                item.tipe === "waktu"
                                  ? "border-blue-500 text-blue-600 bg-blue-50"
                                  : item.tipe === "volume"
                                  ? "border-green-500 text-green-600 bg-green-50"
                                  : "border-slate-500 text-slate-600 bg-slate-50"
                              )}
                            >
                              {ADDENDUM_TYPES.find((t) => t.value === item.tipe)
                                ?.label || item.tipe}
                            </Badge>
                          )}
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAddendumItem(index)}
                          className="text-destructive hover:text-red-700 hover:bg-red-50 h-8 w-8 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </CardHeader>

                      <CardContent className="p-4 space-y-4">
                        <div className="grid gap-4 md:grid-cols-3">
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Nomor Addendum
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Masukkan nomor addendum"
                                value={item.name || ""}
                                onChange={(e) =>
                                  updateAddendumItem(
                                    index,
                                    "name",
                                    e.target.value
                                  )
                                }
                                className={
                                  !item.name ? "border-orange-300" : ""
                                }
                              />
                            </FormControl>
                          </FormItem>

                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Tipe Addendum
                            </FormLabel>
                            <Select
                              value={item.tipe || ""}
                              onValueChange={(value) =>
                                updateAddendumItem(index, "tipe", value)
                              }
                            >
                              <SelectTrigger
                                className={
                                  !item.tipe ? "border-orange-300" : ""
                                }
                              >
                                <SelectValue placeholder="Pilih tipe addendum" />
                              </SelectTrigger>
                              <SelectContent>
                                {ADDENDUM_TYPES.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormItem>

                          <div className="flex items-center pt-6">
                            <Checkbox
                              id={`pemberian-kesempatan-${index}`}
                              checked={item.pemberianKesempatan}
                              onCheckedChange={(
                                checked: boolean | "indeterminate"
                              ) =>
                                updateAddendumItem(
                                  index,
                                  "pemberianKesempatan",
                                  checked === true
                                )
                              }
                              className="data-[state=checked]:bg-blue-600"
                            />
                            <label
                              htmlFor={`pemberian-kesempatan-${index}`}
                              className="text-sm font-medium leading-none ml-2 cursor-pointer"
                            >
                              Pemberian Kesempatan
                            </label>
                          </div>
                        </div>

                        {/* Field untuk tipe waktu */}
                        {item.tipe === "waktu" && (
                          <FormItem>
                            <FormLabel className="text-sm font-medium">
                              Jumlah Hari
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Contoh: 30"
                                value={item.hari || ""}
                                onChange={(e) =>
                                  updateAddendumItem(
                                    index,
                                    "hari",
                                    e.target.value
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription className="text-xs">
                              Tambahan hari kerja
                            </FormDescription>
                          </FormItem>
                        )}

                        {/* Field untuk tipe volume */}
                        {item.tipe === "volume" && (
                          <div className="grid gap-4 md:grid-cols-2">
                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Volume
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: 100"
                                  value={item.volume || ""}
                                  onChange={(e) =>
                                    updateAddendumItem(
                                      index,
                                      "volume",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>

                            <FormItem>
                              <FormLabel className="text-sm font-medium">
                                Satuan
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Contoh: m³, ton, unit"
                                  value={item.satuan || ""}
                                  onChange={(e) =>
                                    updateAddendumItem(
                                      index,
                                      "satuan",
                                      e.target.value
                                    )
                                  }
                                />
                              </FormControl>
                            </FormItem>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {!form.watch("hasAddendum") && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Calendar className="h-16 w-16 text-slate-300 mb-2" />
              <h3 className="text-lg font-medium text-slate-700">
                Tidak Ada Addendum
              </h3>
              <p className="text-slate-500 max-w-md mt-1">
                Aktifkan opsi &quot;Proyek Memiliki Addendum&quot; jika terdapat
                perubahan kontrak setelah penandatanganan
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
