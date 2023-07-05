import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';
import Cart from './modals/Cart';
import PageLoader from './PageLoader';
import { ReactNode, useEffect } from 'react';
import { HeadProps } from '../../@types/index';
import LogoutPrompt from './modals/LogoutPrompt';
import RequestLogin from './modals/RequestLogin';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import CookiesPopup from '@/components/CookiesPopup';

interface IProps {
  children: ReactNode;
  metadata: HeadProps | undefined;
}

export default function Layout({ children, metadata }: IProps) {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  useEffect(() => {
    const isAuthenticated = setTimeout(() => {
      if (router.asPath.includes('dashboard') && !state.auth.id) {
        router.push('/auth/sign-in');
      }
    }, 500);
    return () => clearTimeout(isAuthenticated);
  }, [state.auth]);

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>
        <LogoutPrompt />
        <RequestLogin />
        <Cart />
        <CookiesPopup />
        <PageLoader />
        {children}
      </main>
      <Footer />
    </>
  );
}
