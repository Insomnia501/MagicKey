// i18n
import '../locales/i18n';

// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

// map
import 'mapbox-gl/dist/mapbox-gl.css';

// editor
import 'react-quill/dist/quill.snow.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { CacheProvider, EmotionCache } from '@emotion/react';
// next
import { NextPage } from 'next';
import Head from 'next/head';
import { AppProps } from 'next/app';
// redux
import { Provider as ReduxProvider } from 'react-redux';
// @mui
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
// redux
import { store } from '../redux/store';
// utils
import createEmotionCache from '../utils/createEmotionCache';
// theme
import ThemeProvider from '../theme';
// locales
import ThemeLocalization from '../locales';
// components
import { StyledChart } from '../components/chart';
import ProgressBar from '../components/progress-bar';
import SnackbarProvider from '../components/snackbar';
import { MotionLazyContainer } from '../components/animate';
import { ThemeSettings, SettingsProvider } from '../components/settings';

// Check our docs
// https://docs.minimals.cc/authentication/ts-version

import { AuthProvider } from '../auth/JwtContext';
import { useEffect, useState } from 'react';
// import { AuthProvider } from '../auth/Auth0Context';
// import { AuthProvider } from '../auth/FirebaseContext';
// import { AuthProvider } from '../auth/AwsCognitoContext';

// ----------------------------------------------------------------------

const clientSideEmotionCache = createEmotionCache();

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
  Component: NextPageWithLayout;
}

export default function MyApp(props: MyAppProps) {
  // this manifest is used temporarily for development purposes
  const manifestUrl =
    'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
  const { Component, pageProps, emotionCache = clientSideEmotionCache } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return (
    <>
      {ready ? (
        <CacheProvider value={emotionCache}>
          <Head>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
          </Head>
          <AuthProvider>
            <TonConnectUIProvider manifestUrl={manifestUrl}>
              <ReduxProvider store={store}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <SettingsProvider>
                    <MotionLazyContainer>
                      <ThemeProvider>
                        {/* <ThemeSettings> */}
                        <ThemeLocalization>
                          <SnackbarProvider>
                            <StyledChart />
                            <ProgressBar />
                            {getLayout(<Component {...pageProps} />)}
                          </SnackbarProvider>
                        </ThemeLocalization>
                        {/* </ThemeSettings> */}
                      </ThemeProvider>
                    </MotionLazyContainer>
                  </SettingsProvider>
                </LocalizationProvider>
              </ReduxProvider>
            </TonConnectUIProvider>
          </AuthProvider>
        </CacheProvider>
      ) : null}
    </>
  );
}
