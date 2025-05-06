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
import FormProgress from "./form-progress";
import BasicInfoStep from "./steps/basic-info-step";
import FinancialStep from "./steps/financial-step";
import SupervisionStep from "./steps/supervision-step";
import AdditionalDetailsStep from "./steps/additional-details-step";
import DocumentationStep from "./steps/documentation-step";
import LocationStep from "./steps/location-step";
import AddendumStep from "./steps/addendum-step";
import { Loader2 } from "lucide-react";
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

const steps = [
  { id: 0, title: "Informasi Dasar" },
  { id: 1, title: "Supervisi" },
  { id: 2, title: "Keuangan" },
  { id: 3, title: "Detail Tambahan" },
  { id: 4, title: "Addendum" },
  { id: 5, title: "Dokumentasi" },
  { id: 6, title: "Lokasi" }, // Step terakhir
];

type FieldPath = Path<CompleteContractCreate>;

const stepFieldsMap: Record<number, FieldPath[]> = {
  0: [
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
  1: [
    "korwaslap",
    "nipKorwaslap",
    "pengawasLapangan",
    "nipPengawasLapangan",
    "konsultanSupervisi",
    "nomorKontrakSupervisi",
    "tanggalKontrakSupervisi",
    "masaPelaksanaanSupervisi",
  ],
  2: [
    "paguAnggaran",
    "nilaiKontrak",
    "sumberDana",
    "financialProgress.uangMuka",
    "financialProgress.totalProgress",
  ],
  3: ["hasilProdukAkhir", "dimensi", "kendala"],
  4: ["hasAddendum"],
  5: ["dokumentasiAwal", "dokumentasiTengah", "dokumentasiAkhir"],
  6: [
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
  const router =useRouter()
  const pathname = usePathname()
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
  });

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
            };
            console.log(formData)

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

  const validateCurrentStep = async () => {
    const fieldsToValidate = stepFieldsMap[currentStep] || [];

    if (currentStep === 4 && form.getValues("hasAddendum")) {
      const basicValid = await form.trigger(fieldsToValidate);
      if (!basicValid) return false;

      const addendumCount = form.getValues("addendum")?.length || 0;
      let addendumValid = true;

      for (let i = 0; i < addendumCount; i++) {
        const addendumFields: FieldPath[] = [
          `addendum.${i}.name`,
          `addendum.${i}.tipe`,
          `addendum.${i}.hari`,
        ] as FieldPath[];

        const valid = await form.trigger(addendumFields);
        if (!valid) {
          addendumValid = false;
          break;
        }
      }

      return addendumValid;
    }

    if (fieldsToValidate.length === 0) return true;
    return form.trigger(fieldsToValidate);
  };

  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    if (isValid) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (data: CompleteContractCreate) => {
    if (currentStep === steps.length - 1) { // Submit pada step terakhir (Lokasi)
      setIsSubmitting(true);
      try {
        const result = id
          ? await updateContract(id, data)
          : await createContract(data);

        if (result.success) {
          toast.success(`Kontrak berhasil ${id ? "diperbarui" : "dibuat"}`);
          router.push(`/dashboard/contracts`)
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
    }
  };

  const renderStep = () => {
    if (isLoading) {
      return <div className="flex justify-center py-8">Memuat data...</div>;
    }

    switch (currentStep) {
      case 0:
        return <BasicInfoStep />;
      case 1:
        return <SupervisionStep />;
      case 2:
        return <FinancialStep />;
      case 3:
        return <AdditionalDetailsStep />;
      case 4:
        return <AddendumStep />;
      case 5:
        return <DocumentationStep />;
      case 6:
        return <LocationStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full mx-auto shadow-lg">
        <CardHeader className="border-b pb-4">
          <div className="flex flex-col space-y-1.5">
            <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
              {id
                ? `Edit Kontrak - ${steps[currentStep]?.title}`
                : `Buat Kontrak Baru - ${steps[currentStep]?.title}`}
            </CardTitle>
            {!isLoading && (
              <CardDescription className="text-sm text-muted-foreground">
                Langkah {currentStep + 1} dari {steps.length}
              </CardDescription>
            )}
          </div>
        </CardHeader>

        <CardContent className="px-10 py-5">
          {!isLoading && (
            <div className="mb-6 pb-6 hidden sm:block">
              <FormProgress
                onSelectedStep={(step) => setCurrentStep(step)}
                currentStep={currentStep}
                steps={steps}
              />
            </div>
          )}

          <div className="space-y-6 transition-all duration-300">
            {renderStep()}
          </div>
        </CardContent>

        {!isLoading && (
          <CardFooter className="flex justify-between px-6 pb-6 pt-0 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={cn(
                "transition-opacity",
                currentStep === 0
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              )}
            >
              Kembali
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                type="button"
                onClick={nextStep}
                className="min-w-[100px]"
              >
                Lanjut
              </Button>
            ) : (
              <Button
                type="button"
                className="min-w-[100px]"
                disabled={isSubmitting}
                onClick={form.handleSubmit(handleSubmit)}
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
            )}
          </CardFooter>
        )}
      </Card>
    </FormProvider>
  );
}