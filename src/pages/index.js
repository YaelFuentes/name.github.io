import { Inter } from 'next/font/google'
import withSession from '../lib/session'
import { useRouter } from 'next/router';

import HomePage from './Home'

const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {
  return (
    <main className={`${inter.className}`}>
      <HomePage user={user}/>
    </main>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");

  if (user === undefined && req.url !== '/login') {
    res.setHeader("location", "/login");
    res.statusCode = 302;
    res.end();
    return { props: {} };
  }

  return {
    props: { user: req.session.get("user") },
  };
});
