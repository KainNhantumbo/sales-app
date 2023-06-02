import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';
import { HeadProps } from '../../@types/index';
import LogoutPrompt from './modals/LogoutPrompt';
import { ReactNode, useEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import RequestLogin from './modals/RequestLogin';

interface IProps {
  children: ReactNode;
  metadata?: HeadProps;
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

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>
        <LogoutPrompt />
        <RequestLogin />
        {children}
      </main>
      <Footer />
    </>
  );
}
