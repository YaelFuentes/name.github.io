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
        <div>
          <div>hola</div>
        </div>
    },
    {
      content:
        <div>
          <div>como</div>
        </div>
    },
  ];
  return (
    <div>
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
    </div>
  )
}

export default Turnos;