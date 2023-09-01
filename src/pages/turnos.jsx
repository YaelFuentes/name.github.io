import React from 'react';
import Head from 'next/head';
import VerticalTabs from '@/components/tabs';
import Medical from '@/components/Shift/medical';
import Groomer from '@/components/Shift/groomer';
import ListShift from '@/components/Shift/listShift';

const Turnos = () => {
  const tabs = [
    { label: 'Turno Medico' },
    { label: 'Turno Peluqueria' },
    { label: 'Consultorio' },
  ];
  const tabsContent = [
    {
      content: <Medical />
    },
    {
      content: <Groomer />
    },
    {
      content: <ListShift />
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