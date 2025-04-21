"use client";

import { useState } from "react";
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
import ReviewStep from "./steps/review-step";
import SuccessStep from "./steps/success-step";
import { CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateContractSchema,
  CreateContractType,
} from "@/schemas/contractSchemas";
import { Path } from "react-hook-form";

const steps = [
  { id: 0, title: "Informasi Dasar" },
  { id: 1, title: "Supervisi" },
  { id: 2, title: "Keuangan" },
  { id: 3, title: "Detail Tambahan" },
  { id: 4, title: "Addendum" },
  { id: 5, title: "Dokumentasi" },
  { id: 6, title: "Lokasi" },
  { id: 7, title: "Review" },
];

type FieldPath = Path<CreateContractType>;

const stepFieldsMap: Record<number, FieldPath[]> = {
  0: ["namaPaket", "namaPenyedia", "ppk", "nipPPK", "nomorKontrak", "tanggalKontrak", "masaPelaksanaan", "subKegiatan", "volumeKontrak", "satuanKontrak"],
  1: ["korwaslap", "nipKorwaslap", "pengawasLapangan", "nipPengawasLapangan", "konsultanSupervisi", "nomorKontrakSupervisi", "tanggalKontrakSupervisi", "masaPelaksanaanSupervisi"],
  2: ["paguAnggaran", "nilaiKontrak", "sumberDana", "financialProgress.uangMuka", "financialProgress.totalProgress"],
  3: ["pemberianKesempatan", "hasilProdukAkhir", "dimensi", "kendala", "startDate", "endDate"],
  4: ["hasAddendum"],
  5: ["dokumentasiAwal", "dokumentasiTengah", "dokumentasiAkhir"],
  6: ["location.kota", "location.distrik", "location.kampung", "location.koordinatAwal"],
  7: [],
};

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<CreateContractType>({
    resolver: zodResolver(CreateContractSchema),
    defaultValues: {
      namaPaket: "",
      namaPenyedia: "",
      ppk: "",
      nipPPK: "",
      korwaslap: "",
      nipKorwaslap: "",
      pengawasLapangan: "",
      nipPengawasLapangan: "",
      paguAnggaran: "",
      nilaiKontrak: 0,
      sumberDana: "",
      nomorKontrak: "",
      tanggalKontrak: "",
      masaPelaksanaan: 0,
      subKegiatan: "",
      volumeKontrak: "",
      satuanKontrak: "",
      konsultanSupervisi: "",
      nomorKontrakSupervisi: "",
      nilaiKontrakSupervisi: 0,
      tanggalKontrakSupervisi: "",
      masaPelaksanaanSupervisi: 0,
      pemberianKesempatan: false,
      hasilProdukAkhir: "",
      dimensi: "",
      kendala: false,
      permasalahan: "",
      keterangan: "",
      dokumentasiAwal: null,
      dokumentasiTengah: null,
      dokumentasiAkhir: null,
      startDate: null,
      endDate: null,
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
    },
    mode: "onTouched",
  });

  // Validate only the fields relevant to the current step
  const validateCurrentStep = async () => {
    const fieldsToValidate = stepFieldsMap[currentStep] || [];
    
    // Special handling for addendum step
    if (currentStep === 4 && form.getValues("hasAddendum")) {
      // If we need to validate addendum fields, we'll need a more complex approach
      // First validate the basic fields
      const basicValid = await form.trigger(fieldsToValidate);
      if (!basicValid) return false;
      
      // Then validate the addendum array - we need to handle this differently 
      // since it's a dynamic array
      const addendumCount = form.getValues("addendum")?.length || 0;
      let addendumValid = true;
      
      for (let i = 0; i < addendumCount; i++) {
        // Create paths for each addendum item's fields that need validation
        const addendumFields: FieldPath[] = [
          `addendum.${i}.nomorAddendum`,
          `addendum.${i}.tanggalAddendum`,
          `addendum.${i}.nilaiAddendum`
        ] as FieldPath[];
        
        // Validate each addendum item
        const valid = await form.trigger(addendumFields);
        if (!valid) {
          addendumValid = false;
          break;
        }
      }
      
      return addendumValid;
    }
    
    // For other steps, just validate the defined fields
    if (fieldsToValidate.length === 0) return true;
    return form.trigger(fieldsToValidate);
  };

  // Go to the next step
  const nextStep = async () => {
    const isValid = await validateCurrentStep();
    
    if (isValid) {
      // Special case for addendum step
      if (currentStep === 4 && !form.getValues("hasAddendum")) {
        // Skip validation of addendum fields if hasAddendum is false
        setCurrentStep(currentStep + 1);
        return;
      }
      
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  // Go to the previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Submit the form
  const onSubmit = async (data: CreateContractType) => {
    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", data);
      // setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Render the current step
  const renderStep = () => {
    if (isSubmitted) {
      return <SuccessStep />;
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
      case 7:
        return <ReviewStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...form}>
      <Card className="w-full mx-auto shadow-lg">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardHeader className="border-b pb-4">
            <div className="flex flex-col space-y-1.5">
              <CardTitle className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    Submission Successful
                  </>
                ) : (
                  steps[currentStep]?.title || "Contract Form"
                )}
              </CardTitle>
              {!isSubmitted && (
                <CardDescription className="text-sm text-muted-foreground">
                  Step {currentStep + 1} of {steps.length}
                </CardDescription>
              )}
            </div>
          </CardHeader>

          <CardContent className="px-10 py-5">
            {!isSubmitted && (
              <div className="mb-6 pb-6 hidden sm:block">
                <FormProgress onSelectedStep={(step) => setCurrentStep(step)} currentStep={currentStep} steps={steps} />
              </div>
            )}

            <div
              className={cn(
                "space-y-6 transition-all duration-300",
                isSubmitted ? "text-center py-8" : ""
              )}
            >
              {renderStep()}
            </div>
          </CardContent>

          {!isSubmitted && (
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
                Back
              </Button>
              
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="min-w-[100px]"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="min-w-[100px]"
                >
                  Simpan Kontrak
                </Button>
              )}
            </CardFooter>
          )}
        </form>
      </Card>
    </FormProvider>
  );
}