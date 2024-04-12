import { AppContext } from '@/context/app-context';
import '@/styles/global.css';
import 'moment/locale/pt-br';
import type { AppProps } from 'next/app';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <Component {...pageProps} />
    </AppContext>
  );
}
