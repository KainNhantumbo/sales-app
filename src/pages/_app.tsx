import '@/styles/global.css';
import type { AppProps } from 'next/app';
import AppContext from '@/context/AppContext';
import CookiesPopup from '@/components/CookiesPopup';
import 'moment/locale/pt-br';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
      <CookiesPopup/>
    </AppContext>
  );
}
