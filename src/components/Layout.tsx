import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';
import { HeadProps } from '../../@types/index';
import LogoutPrompt from './modals/LogoutPrompt';
import { ReactNode, useLayoutEffect } from 'react';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
interface IProps {
  children: ReactNode;
  metadata?: HeadProps;
}

export default function Layout({ children, metadata }: IProps) {
  const router: NextRouter = useRouter();
  const { state } = useAppContext();

  useLayoutEffect(() => {
    const isUserAuthenticated = setTimeout(() => {
      if (router.asPath.includes('users') && !state.userAuth.id) {
        router.push('/auth/sign-in');
      }
    }, 100);
    return () => clearTimeout(isUserAuthenticated);
  }, [state.userAuth]);

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>
        <LogoutPrompt />
        {children}
      </main>
      <Footer />
    </>
  );
}
