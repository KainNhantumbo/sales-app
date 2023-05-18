import { ReactNode, useEffect } from 'react';
import { HeadProps } from '../../@types/index';
import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';
import { useAppContext } from '@/context/AppContext';
import { NextRouter, useRouter } from 'next/router';
interface IProps {
  children: ReactNode;
  metadata?: HeadProps;
}

export default function Layout({ children, metadata }: IProps) {
  const router: NextRouter = useRouter();
  const { state } = useAppContext();

  useEffect(() => {
    const isUserAuthenticated = setTimeout(() => {
      if (router.asPath.includes('dashboard') && !state.userAuth.id) {
        router.push('/auth/sign-in');
      }
    }, 100);
    return () => clearTimeout(isUserAuthenticated);
  }, [state.userAuth]);

  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
