import CookiesPopup from '@/components/cookies-popup';
import { useThemeContext } from '@/context/theme-context';
import { useAppContext } from '@/context/app-context';
import { useRouter } from 'next/router';
import { useEffect, type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { HeadProps } from '../types/index';
import { Footer } from './footer';
import Metadata from './head';
import { Header } from './header';
import { LoadingIndicator } from './loading-indicator';
import { Cart } from './modals/cart';
import { Prompt } from './modals/prompt';

type Props = { children: ReactNode; metadata: HeadProps };

export default function Layout({ children, metadata }: Props) {
  const { state } = useAppContext();
  const { colorScheme } = useThemeContext();
  const router = useRouter();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      if (router.asPath.includes('dashboard') && !state.auth.id) {
        router.push('/auth/sign-in');
      }
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [state.auth]);

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>
        <Prompt />
        <ToastContainer
          autoClose={10000}
          limit={3}
          newestOnTop={true}
          position='bottom-right'
          stacked={true}
          className={'toast-container'}
          theme={colorScheme.scheme === 'dark' ? 'dark' : 'light'}
        />
        <Cart />
        <CookiesPopup />
        <LoadingIndicator />
        {children}
      </main>
      <Footer />
    </>
  );
}
