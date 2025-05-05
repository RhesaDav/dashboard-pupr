import { getContractById } from "@/actions/contract";
import { FinancialProgressForm } from "../../_components/financial-progress-form";

export default async function FinancialProgressPage({
  params
}: {
  params: { id: string }
}) {
  const contract = await getContractById(params.id);

  if (!contract) {
    return <div>Kontrak tidak ditemukan</div>;
  }

  const handleSave = async (data: {
    uangMuka: number;
    termin1: number;
    termin2: number;
    termin3: number;
    termin4: number;
  }) => {
    "use server";
    // await updateFinancialProgress(contract.id, data);
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Progress Finansial - {contract.data?.namaPaket}
      </h1>
      
      <FinancialProgressForm/>
    </div>
  );
}
