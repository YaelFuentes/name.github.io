import React from 'react';
import Head from 'next/head';
import VerticalTabs from '@/components/tabs';
import Medical from '@/components/Shift/medical';
import Groomer from '@/components/Shift/groomer';
import ListShift from '@/components/Shift/listShift';

const Turnos = () => {
  const tabs = [
    { label: 'Listado de turnos' },
  ];
  const tabsContent = [
    {
      content: <Groomer />
    },
  ];
  return (
    <div>
      <div>
        <Head>
          <title>Mevep</title>
        </Head>
      </div>
      <div className='p-2 m-2'>
       <Groomer/>
      </div>
    </div>
  )
}

export default Turnos;