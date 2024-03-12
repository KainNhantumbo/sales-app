import { AppContext } from '@/context/AppContext';
import '@/styles/global.css';
import 'moment/locale/pt-br';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}
