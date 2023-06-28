import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';
import Cart from './modals/Cart';
import { HeadProps } from '../../@types/index';
import LogoutPrompt from './modals/LogoutPrompt';
import { ReactNode, useEffect, useState } from 'react';
import { NextRouter, Router, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import RequestLogin from './modals/RequestLogin';
import PushNotification from './PageLoader';

interface IProps {
  children: ReactNode;
  metadata: HeadProps | undefined;
}

export default function Layout({ children, metadata }: IProps) {
  const router: NextRouter = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    const isUserAuthenticated = setTimeout(() => {
      if (router.asPath.includes('dashboard') && !state.auth.id) {
        router.push('/auth/sign-in');
      }
    }, 5000);
    return () => clearTimeout(isUserAuthenticated);
  }, [state.auth]);

  const [loadingPage, setLoadingPage] = useState(false);
  // Used for page transition
  const startPageTransition = () => {
    setLoadingPage(true);
  };
  const endPageTransition = () => {
    setLoadingPage(false);
  };
  useEffect(() => {
    Router.events.on('routeChangeStart', startPageTransition);
    Router.events.on('routeChangeComplete', endPageTransition);
    Router.events.on('routeChangeError', endPageTransition);
    return () => {
      Router.events.off('routeChangeStart', startPageTransition);
      Router.events.off('routeChangeComplete', endPageTransition);
      Router.events.off('routeChangeError', endPageTransition);
    };
  }, []);

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>
        <LogoutPrompt />
        <RequestLogin />
        <Cart />
        <PushNotification isActive={loadingPage} />
        {children}
      </main>
      <Footer />
    </>
  );
}
