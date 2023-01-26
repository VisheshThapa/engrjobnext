import { AppProps } from 'next/app';
import { UserContext } from '../lib/context';
import { useSession } from "../lib/use_session";
import Navbar from '../components/Navbar';
import { useEffect, useState, useMemo  } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';
import { useUserData } from '../lib/hooks';
import '../styles/globals.css';




export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('dark');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

  const userData = useSession();

  return (
    <>
    
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme
        }}
      >
        <UserContext.Provider value={userData}>
          <Navbar/>
          <Component {...pageProps} />
        </UserContext.Provider>

      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}