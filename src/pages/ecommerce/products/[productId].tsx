import { useEffect } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import AppContext from '@/context/AppContext';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import ErrorPage from '@/pages/error-page';
import { NextRouter, useRouter } from 'next/router';
import fetch from '../../../config/client';
import { Product } from '../../../../@types';
import { GetStaticPropsContext } from 'next';
import { EcommerceProductContainer as Container } from '@/styles/common/ecommerce-product';

type Props = { product: Product };

export default function Product(props: Props): JSX.Element {
  const router: NextRouter = useRouter();

  if (!props.product) {
    return <ErrorPage retryFn={router.reload} />;
  }
  return (
    <Layout>
      <QRCode
        size={10}
        style={{
          height: 'auto',
          maxWidth: '100px',
          width: '100%',
          padding: 8,
          borderRadius: '8px',
          background: '#fff'
        }}
        value={router.asPath}
      />
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}

type ContextProps = GetStaticPropsContext;
export async function getStaticProps(context: ContextProps) {
  try {
    const { data } = await fetch<Product>({
      method: 'get',
      url: `/api/v1/users/products/${context.params?.productId}`
    });
    return { props: { product: { ...data } }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
