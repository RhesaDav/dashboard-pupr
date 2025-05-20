"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BasicInfoStep from "./steps/basic-info-step";
import FinancialStep from "./steps/financial-step";
import SupervisorStep from "./steps/supervisor-step";
import AdditionalDetailsStep from "./steps/additional-details-step";
import DocumentationStep from "./steps/documentation-step";
import LocationStep from "./steps/location-step";
import AddendumStep from "./steps/addendum-step";
import { Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Path } from "react-hook-form";
import {
  createContract,
  getContractById,
  updateContract,
} from "@/actions/contract";
import { toast } from "sonner";
import {
  CompleteContractCreate,
  CompleteContractCreateSchema,
} from "@/schemas/contract.schema";
import { usePathname, useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const tabs = [
  { id: "basic-info", title: "Informasi Dasar" },
  { id: "supervisor", title: "Pengawas" },
  { id: "financial", title: "Keuangan" },
  { id: "additional", title: "Detail Tambahan" },
  { id: "addendum", title: "Addendum" },
  { id: "documentation", title: "Dokumentasi" },
  { id: "location", title: "Lokasi" },
];

type FieldPath = Path<CompleteContractCreate>;

const tabFieldsMap: Record<string, FieldPath[]> = {
  "basic-info": [
    "namaPaket",
    "namaPenyedia",
    "ppk",
    "nipPPK",
    "nomorKontrak",
    "tanggalKontrak",
    "masaPelaksanaan",
    "subKegiatan",
    "volumeKontrak",
    "satuanKontrak",
  ],
  supervisor: [
    "korwaslap",
    "nipKorwaslap",
    "pengawasLapangan",
    "nipPengawasLapangan",
    "konsultanSupervisi",
    "nomorKontrakSupervisi",
    "tanggalKontrakSupervisi",
    "masaPelaksanaanSupervisi",
  ],
  financial: [
    "paguAnggaran",
    "nilaiKontrak",
    "sumberDana",
    "financialProgress.uangMuka",
    "financialProgress.totalProgress",
  ],
  additional: ["hasilProdukAkhir", "dimensi"],
  addendum: ["hasAddendum"],
  documentation: ["dokumentasiAwal", "dokumentasiTengah", "dokumentasiAkhir"],
  location: [
    "location.kota",
    "location.distrik",
    "location.kampung",
    "location.koordinatAwal",
  ],
};

interface MultiStepFormProps {
  id?: string;
}

export default function MultiStepForm({ id }: MultiStepFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("basic-info");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tabErrors, setTabErrors] = useState<Record<string, boolean>>({});
  const [isAnyImageUploading, setIsAnyImageUploading] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [formDataToSubmit, setFormDataToSubmit] =
    useState<CompleteContractCreate | null>(null);
  const [hasDateChanged, setHasDateChanged] = useState(false);
  const [originalDate, setOriginalDate] = useState<Date | null>(null);

  const defaultValues = {
    namaPaket: "",
    namaPenyedia: "",
    ppk: "",
    nipPPK: "",
    korwaslap: "",
    nipKorwaslap: "",
    pengawasLapangan: "",
    nipPengawasLapangan: "",
    paguAnggaran: 0,
    nilaiKontrak: 0,
    sumberDana: "",
    nomorKontrak: "",
    tanggalKontrak: new Date(),
    masaPelaksanaan: 0,
    subKegiatan: "",
    volumeKontrak: "",
    satuanKontrak: "",
    konsultanSupervisi: "",
    nomorKontrakSupervisi: "",
    nilaiKontrakSupervisi: 0,
    tanggalKontrakSupervisi: new Date(),
    masaPelaksanaanSupervisi: 0,
    hasilProdukAkhir: "",
    dimensi: "",
    kendala: false,
    permasalahan: "",
    keterangan: "",
    dokumentasiAwal: null,
    dokumentasiTengah: null,
    dokumentasiAkhir: null,
    hasAddendum: false,
    location: {
      kota: "",
      distrik: "",
      kampung: "",
      koordinatAwal: "",
      koordinatAkhir: "",
    },
    financialProgress: {
      totalProgress: 0,
      totalPayment: 0,
      uangMuka: 0,
      termin1: 0,
      termin2: 0,
      termin3: 0,
      termin4: 0,
    },
    physicalProgress: [],
    addendum: [],
  };

  const form = useForm<CompleteContractCreate>({
    resolver: zodResolver(CompleteContractCreateSchema),
    defaultValues,
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { errors } = form.formState;
  const tanggalKontrak = form.watch("tanggalKontrak");

  useEffect(() => {
    if (originalDate && tanggalKontrak && id) {
      const oldDate = new Date(originalDate);
      const newDate = new Date(tanggalKontrak);

      const oldDateStr = oldDate.toISOString().split("T")[0];
      const newDateStr = newDate.toISOString().split("T")[0];

      setHasDateChanged(oldDateStr !== newDateStr);
    }
  }, [tanggalKontrak, originalDate, id]);

  useEffect(() => {
    const newTabErrors: Record<string, boolean> = {};

    for (const [tabId, fields] of Object.entries(tabFieldsMap)) {
      const hasError = fields.some((fieldName) => {
        const fieldParts = fieldName.toString().split(".");
        let currentError = errors;

        for (const part of fieldParts) {
          if (
            !currentError ||
            !currentError[part as keyof typeof currentError]
          ) {
            return false;
          }
          currentError = currentError[part as keyof typeof currentError] as any;
        }

        return Boolean(currentError);
      });

      newTabErrors[tabId] = hasError;
    }

    setTabErrors(newTabErrors);
  }, [errors, form.formState.submitCount]);

  useEffect(() => {
    const fetchContractData = async () => {
      if (id) {
        setIsLoading(true);
        try {
          const result = await getContractById(id);
          if (result.data) {
            const {
              id: _,
              createdAt,
              updatedAt,
              contractAccess,
              ...contractData
            } = result.data;

            if (contractData.tanggalKontrak) {
              setOriginalDate(new Date(contractData.tanggalKontrak));
            }

            const formData = {
              ...contractData,
              location: contractData.location
                ? {
                    kota: contractData.location.kota || "",
                    distrik: contractData.location.distrik || "",
                    kampung: contractData.location.kampung || "",
                    koordinatAwal: contractData.location.koordinatAwal || "",
                    koordinatAkhir: contractData.location.koordinatAkhir || "",
                  }
                : undefined,
              financialProgress: contractData.financialProgress
                ? {
                    totalProgress:
                      contractData.financialProgress.totalProgress || 0,
                    totalPayment:
                      contractData.financialProgress.totalPayment || 0,
                    uangMuka: contractData.financialProgress.uangMuka || 0,
                    termin1: contractData.financialProgress.termin1 || 0,
                    termin2: contractData.financialProgress.termin2 || 0,
                    termin3: contractData.financialProgress.termin3 || 0,
                    termin4: contractData.financialProgress.termin4 || 0,
                  }
                : undefined,
              physicalProgress:
                contractData.physicalProgress?.map((progress) => ({
                  ...progress,
                })) || [],
              addendum: contractData.addendum || [],
              hasAddendum: contractData.addendum.length <= 0 ? false : true,
              totalAddendumWaktu: contractData.totalAddendumWaktu || 0,
            };

            form.reset(formData);
          }
        } catch (error) {
          toast.error("Gagal memuat data kontrak");
          console.error("Error fetching contract:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchContractData();
  }, [id, form]);

  const handleSubmit = async (data: CompleteContractCreate) => {
    setIsSubmitting(true);
    try {
      const result = id
        ? await updateContract(id, data)
        : await createContract(data);
      if (result.success) {
        toast.success(`Kontrak berhasil ${id ? "diperbarui" : "dibuat"}`);
        router.push(`/dashboard/contracts`);
        if (!id) {
          form.reset();
        }
      } else {
        toast.error(`Gagal ${id ? "memperbarui" : "membuat"} kontrak`);
      }
    } catch (error: any) {
      toast.error(error.message || "Terjadi kesalahan");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = async () => {
    const result = await form.trigger();

    const addendumItems = form.getValues("addendum") || [];
    const hasEmptyAddendumFields = addendumItems.some((item) => {
      return (
        !item.name ||
        !item.tipe ||
        (item.tipe === "waktu" && !item.tanggal) ||
        (item.tipe === "volume" && (!item.volume || isNaN(Number(item.volume))))
      );
    });

    if (hasEmptyAddendumFields) {
      setActiveTab("addendum");
      setTabErrors({"addendum": true})
      toast.error("Harap lengkapi semua field addendum yang wajib diisi", {
        duration: 3000,
      });
      return;
    }

    if (!result) {
      const currentTabErrors: Record<string, boolean> = {};

      for (const [tabId, fields] of Object.entries(tabFieldsMap)) {
        const hasError = fields.some((fieldName) => {
          const fieldParts = fieldName.toString().split(".");
          const currentErrors = form.formState.errors;
          let hasNestedError = false;

          let current: any = currentErrors;
          for (const part of fieldParts) {
            if (!current || !current[part]) {
              hasNestedError = false;
              break;
            }
            current = current[part];
            hasNestedError = true;
          }

          return hasNestedError;
        });

        currentTabErrors[tabId] = hasError;
      }

      for (const tab of tabs) {
        if (currentTabErrors[tab.id]) {
          setActiveTab(tab.id);
          toast.error(`Ada kesalahan pada tab ${tab.title}`, {
            duration: 3000,
          });
          break;
        }
      }

      return;
    }

    const data = form.getValues();
    setFormDataToSubmit(data);

    if (id && hasDateChanged) {
      setIsConfirmDialogOpen(true);
    } else {
      form.handleSubmit(handleSubmit)();
    }
  };

  const handleDialogConfirm = () => {
    setIsConfirmDialogOpen(false);
    if (formDataToSubmit) {
      handleSubmit(formDataToSubmit);
    }
  };

  const handleDialogCancel = () => {
    setIsConfirmDialogOpen(false);
    setFormDataToSubmit(null);
  };

  const handleImageUploadStatusChange = (isUploading: boolean) => {
    setIsAnyImageUploading(isUploading);
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full mx-auto shadow-lg">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              {id ? `Edit Kontrak` : `Buat Kontrak Baru`}
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="px-6 py-5">
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              <span>Memuat data...</span>
            </div>
          ) : (
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 md:grid-cols-7 w-full mb-6">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className={cn(
                      "text-xs md:text-sm relative",
                      tabErrors[tab.id] && "text-destructive"
                    )}
                  >
                    {tab.title}
                    {tabErrors[tab.id] && (
                      <AlertCircle className="h-3 w-3 absolute -top-1 -right-1 text-destructive z-10" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="basic-info">
                <BasicInfoStep />
              </TabsContent>

              <TabsContent value="supervisor">
                <SupervisorStep />
              </TabsContent>

              <TabsContent value="financial">
                <FinancialStep />
              </TabsContent>

              <TabsContent value="additional">
                <AdditionalDetailsStep />
              </TabsContent>

              <TabsContent value="addendum">
                <AddendumStep />
              </TabsContent>

              <TabsContent value="documentation">
                <DocumentationStep
                  onUploadStatusChange={handleImageUploadStatusChange}
                />
              </TabsContent>

              <TabsContent value="location">
                <LocationStep />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>

        {!isLoading && (
          <CardFooter className="flex justify-end px-6 pb-6 pt-2 border-t">
            <Button
              type="button"
              className="min-w-[120px]"
              disabled={isSubmitting || isAnyImageUploading || isLoading}
              onClick={handleFormSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {id ? "Memperbarui..." : "Menyimpan..."}
                </>
              ) : id ? (
                "Perbarui Kontrak"
              ) : (
                "Simpan Kontrak"
              )}
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Confirmation Dialog for Date Change */}
      <AlertDialog
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Perubahan Tanggal</AlertDialogTitle>
            <AlertDialogDescription className="text-destructive font-medium">
              Perubahan tanggal kontrak akan mereset jadwal progress yang belum
              diisi. Progress yang sudah direkam tidak akan terpengaruh.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDialogCancel}>
              Batal
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDialogConfirm}>
              Lanjutkan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </FormProvider>
  );
}
