import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import withSession from '../lib/session'
import Layout from '@/components/hooks/layout'
import ResponsiveAppBar from '@/layout/headers'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {
  console.log(user)
  return (
    <main className={`${inter.className}`}>
      <div>
        <Head>
          <title>Mevep</title>
        </Head>
        <Layout className='pt-0'>
          <div>hola, {user.username}</div>
        </Layout>
      </div>
    </main>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined) {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});
