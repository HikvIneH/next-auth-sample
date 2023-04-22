import * as React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {CacheProvider, EmotionCache} from '@emotion/react';
import theme from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import {ApolloProvider} from '@apollo/client';
import client from '../constants/apollo-client';
import Guard from '../components/Guard';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const {Component, emotionCache = clientSideEmotionCache, pageProps: {user, ...pageProps}} = props;

  return (
    <CacheProvider value={emotionCache}>
      <ApolloProvider client={client}>
        <Guard excludedRoutes={["/", "/login", "/register"]} {...pageProps}>

          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>

          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Component user={user} {...pageProps} />
          </ThemeProvider>
        </Guard>
      </ApolloProvider>
    </CacheProvider>
  );
}