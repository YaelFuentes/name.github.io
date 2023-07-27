import '@/styles/globals.css'
import { SWRConfig } from "swr"
import fetch from "../lib/fetchJson"
import { Montserrat } from "next/font/google"
import { useRouter } from 'next/router'
import ResponsiveAppBar from '@/layout/headers'
import { useState, useEffect } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api';


const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-mont"
})

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function checkIfUserIsLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  useEffect(() => {
    fetch('/api/clients/client')
    .then(res => console.log(res))

    const isAuthenticated = checkIfUserIsLoggedIn(); 
    setIsLoggedIn(isAuthenticated);
  }, []);

  // Redirigir a la página de inicio de sesión si el usuario no ha iniciado sesión y está intentando acceder a una página protegida
  useEffect(() => {
    if (!isLoggedIn && !isLoginPage) {
      router.push('/login');
    }
  }, [isLoggedIn, router.pathname]);

  const isLoginPage = router.pathname === '/login'; // Verificar si la ruta actual es la página de inicio de sesión
  const apiKey = 'AIzaSyAzPcAiZC1Wz5VcNUpYZi5n2j05b2G_V8Y'

  return (
    <main className={`${montserrat.variable} font-mont bg-light dark:bg-dark w-full min-h-screen`}>
      {!isLoginPage && isLoggedIn && <ResponsiveAppBar />} {/* Ocultar la ResponsiveAppBar en la página de inicio de sesión y cuando no se ha iniciado sesión */}
      <SWRConfig
        value={{
          fetcher: fetch,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        <LoadScript googleMapsApiKey={apiKey}>
          <Component key={router.asPath} {...pageProps} />
        </LoadScript>

      </SWRConfig>
    </main>
  );
}

export default MyApp
