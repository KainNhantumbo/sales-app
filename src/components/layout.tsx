import { Header } from './header';
import { Footer } from './footer';
import { Cart } from './modals/cart';
import {LoadingIndicator} from './loading-indicator';
import { ReactNode, useEffect } from 'react';
import { HeadProps } from '../types/index';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import CookiesPopup from '@/components/cookies-popup';
import { Prompt } from './modals/prompt';
import Metadata from './head';

interface Props {
  children: ReactNode;
  metadata: HeadProps | undefined;
}

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
