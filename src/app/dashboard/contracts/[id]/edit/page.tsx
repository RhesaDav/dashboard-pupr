import React from 'react'
import { getContractById } from '../../../../../actions/contract';

async function page({ params }: { params: { id: string } }) {
  // return <ContactForm type="edit" id={params.id} initialData={(await getContractById(params.id)).data} />;
  return <div>edit</div>
}

export default page;
