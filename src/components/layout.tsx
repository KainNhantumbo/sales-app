import CookiesPopup from '@/components/cookies-popup';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { type ReactNode, useEffect } from 'react';
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
        <Prompt key={state.prompt.title.split(' ').join('') || undefined} />
        <Cart />
        <CookiesPopup />
        <LoadingIndicator />
        {children}
      </main>
      <Footer />
    </>
  );
}
