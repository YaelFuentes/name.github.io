import React from 'react';
import Head from 'next/head';
import VerticalTabs from '@/components/tabs';

const Turnos = () => {
  const tabs = [
    { label: 'Turno Medico' },
    { label: 'Turno Peluqueria' },

  ];
  const tabsContent = [
    {
      content:
        <>
          <div>hola</div>
        </>
    },
    {
      content:
        <>
          <div>como</div>
        </>
    },
  ];
  return (
    <>
      <div>
        <Head>
          <title>Mevep</title>
        </Head>
      </div>
      <div>
        <VerticalTabs
          tabs={tabs}
          tabsContent={tabsContent}
        />
      </div>
    </>
  )
}

export default Turnos;