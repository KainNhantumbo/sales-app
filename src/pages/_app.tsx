import 'moment/locale/pt-br';
import '@/styles/global.css';
import type { FC } from 'react';
import type { AppProps } from 'next/app';
import AppContext from '@/context/AppContext';

const App: FC<AppProps> = ({ Component, pageProps }): JSX.Element => (
  <AppContext>
    <Component {...pageProps} />
  </AppContext>
);

export default App;
