import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import ToucanLoader from '../components/info/ToucanLoader';
import { AuthProvider } from '../contexts/AuthContext';
import ModalProvider from '../contexts/ModalProvider';
import { GlobalStyle } from '../styles/globalStyles';

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  console.log('TEST-LOG-LINE11_Session in _app page ->', session);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (document && document.documentElement) {
      document.documentElement.className = document.documentElement.className.replace('no-fouc', 'fouc');
    }
  }, []);

  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsLoading(true);
    });

    Router.events.on('routeChangeComplete', () => {
      setIsLoading(false);
    });

    Router.events.on('routeChangeError', () => {
      setIsLoading(false);
    });
  }, [Router]);

  return (
    <SessionProvider session={session}>
      <AuthProvider>
        <ModalProvider>
          <GlobalStyle />
          {isLoading ? <ToucanLoader /> : <Component {...pageProps} />}
        </ModalProvider>
      </AuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
