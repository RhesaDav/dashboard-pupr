import { ConfirmModal } from "@/components/ConfirmModal";
import { ContractsPage } from "./_components/ContractPage";

export default function HomePage() {
    return (
        <div>
            <ContractsPage/>
            <ConfirmModal/>
        </div>
    );
  }