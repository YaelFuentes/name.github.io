import React from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/Flowbite/cardTab';
import InfoClientCard from '@/components/infoClientCard';
import MedicalHistory from '@/components/fragments/medicalHistory';

const idMembership = () => {
  const router = useRouter();
  const clientId = router.query.id;

  // Verifica si clientId tiene un valor antes de renderizar
  if (!clientId) {
    return <div>Cargando...</div>; // o algún indicador de carga
  }

  const tabsData = [
    {
      title: 'Informacion',
      content: <InfoClientCard id={clientId} />
    },
    {
      title: 'Historial medico',
      content: <MedicalHistory id={clientId}/>
    },
    { title: 'Cuotas', content: 'Contenido de la Tab 3' },
  ];

  return (
    <>
      <CardTab tabs={tabsData} />
    </>
  )
}

export default idMembership;
