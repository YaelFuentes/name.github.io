import React from 'react';
import Head from 'next/head';
import VerticalTabs from '@/components/tabs';
import PaymentDebt from '@/components/tabsPay/paymentDebt';
import NewPays from '@/components/tabsPay/newPays';

const Pagos = () => {
  const tabs = [
    { label: 'Tab 1' },
    { label: 'Tab 2' },
    { label: 'Tab 3' },
  ];
  const tabsContent = [
    {
      content:
        <div>
          <PaymentDebt />
        </div>
    },
    {
      content:
        <div>
          <NewPays />
        </div>
    },
    {
      content:
        <div>
          <div>estas</div>
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

export default Pagos;