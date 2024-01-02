import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/Flowbite/cardTab';
import InfoClientCard from '@/components/infoClientCard';

const idMembership = () => {
  const router = useRouter();
  const clientId = router.query.id;

  const tabsData = [
    {
      title: 'Informacion',
      content: <InfoClientCard id={clientId} />
    },
    { title: 'Historial medico', content: 'Contenido de la Tab 2' },
    { title: 'Cuotas', content: 'Contenido de la Tab 3' },
  ];


  return (
    <>
      <CardTab tabs={tabsData} />
    </>
  )
}

export default idMembership