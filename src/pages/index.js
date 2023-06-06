import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import withSession from '../lib/session'
import Layout from '@/components/hooks/layout'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div>
        <Head>
          <title>Home</title>
        </Head>
        <Layout className='pt-0 md:pt-16 sm:pt-8'>
          
        </Layout>
        {/* <h2>Welcome to the home page {user.username}!</h2> */}
        <a href='/api/logout'>Logout</a>
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
