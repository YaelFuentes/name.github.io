import '@/styles/globals.css'
import { SWRConfig } from "swr"
import fetch from "../lib/fetchJson"
import { Montserrat } from "next/font/google"
import { useRouter } from 'next/router'
import NavBar from '@/components/NavBar'
import ResponsiveAppBar from '@/layout/headers'


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
})


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
      <ResponsiveAppBar/>
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <Component key={router.asPath} {...pageProps} />
      </SWRConfig>
    </main>
  );
}

export default MyApp
