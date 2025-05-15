import { getContractById } from "@/actions/contract";
import { FinancialProgressForm } from "../../_components/financial-progress-form";

export default async function FinancialProgressPage({ params }: { params: Promise<{ id: string }> }) {
  const contract = await getContractById((await params).id as string);

  if (!contract) {
    return <div>Kontrak tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">
        Progress Finansial - {contract.data?.namaPaket}
      </h1>
      
      <FinancialProgressForm/>
    </div>
  );
}
