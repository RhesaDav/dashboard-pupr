import React from 'react'
import ContactForm from '../../_components/ContractForm'
import { ContractFormData } from '@/schemas/contractSchemas';
import { getContractById } from '../../actions/contract';

async function page({ params }: { params: { id: string } }) {
  return <ContactForm type="detail" id={params.id} initialData={(await getContractById(params.id)).data} />;
}

export default page;
