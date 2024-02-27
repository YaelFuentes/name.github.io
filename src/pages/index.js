import { Inter } from 'next/font/google'
import withSession from '../lib/session'
import HomePage from './Home'
import Login from './login'


const inter = Inter({ subsets: ['latin'] })

export default function Home({ user }) {
  return (
    <main className={`${inter.className}`}>
      {user !== undefined ? <HomePage user={user} /> : <Login />}
    </main>
  )
}

export const getServerSideProps = withSession(async function ({ req, res }) {
  const user = req.session.get("user");
  const mail = req.session.get("mail")

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
