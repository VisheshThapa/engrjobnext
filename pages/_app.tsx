import { AppProps } from 'next/app';
import Head from 'next/head';

import { useState } from 'react';
import { MantineProvider, ColorSchemeProvider, ColorScheme } from '@mantine/core';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>('light');
  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));
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
        <Component {...pageProps} />
      </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}