import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import CardTab from '@/components/Flowbite/cardTab';
import InfoClientCard from '@/components/infoClientCard';

const idMembership = () => {
  const router = useRouter();
  const clientId = router.query.id;
 
  const tabsData = [
    {
      title: 'Tab 1',
      content: <InfoClientCard id={clientId}/>
    },
    { title: 'Tab 2', content: 'Contenido de la Tab 2' },
    { title: 'Tab 3', content: 'Contenido de la Tab 3' },
  ];

  
  return (
    <>
      <CardTab tabs={tabsData} />
    </>
  )
}

export default idMembership