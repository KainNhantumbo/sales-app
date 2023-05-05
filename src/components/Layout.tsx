import { ReactNode } from 'react';
import { HeadProps } from '../../@types/index';
import Metadata from './Head';
import Header from './Header';
import Footer from './Footer';

interface IProps {
  children: ReactNode;
  metadata?: HeadProps;
}

export default function Layout({ children, metadata }: IProps): JSX.Element {
  return (
    <>
      <Metadata {...metadata} />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
