import { ConfirmModal } from "@/components/ConfirmModal";
import { ContractsPage } from "./ContractPage";

export default function HomePage() {
    return (
        <div>
            <ContractsPage/>
            <ConfirmModal/>
        </div>
    );
  }