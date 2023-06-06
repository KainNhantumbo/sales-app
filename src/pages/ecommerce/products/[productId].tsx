import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import ErrorPage from '@/pages/error-page';
import { NextRouter, useRouter } from 'next/router';
import fetch from '../../../config/client';
import { Product } from '../../../../@types';
import { EcommerceProductContainer as Container } from '@/styles/common/ecommerce-product';
import ShareProducts from '@/components/modals/ShareProductModal';
import { useAppContext } from '@/context/AppContext';

type Props = { product: Product };

export default function Product({ product }: Props): JSX.Element {
  const router: NextRouter = useRouter();
  const { shareProductController } = useAppContext();

  if (!product) {
    return <ErrorPage retryFn={router.reload} />;
  }

  console.info(product);
  console.info(product);
  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | ${product.name}`,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }}>
      <ShareProducts />
      {/* <QRCode
        size={10}
        style={{
          height: 'auto',
          maxWidth: '100px',
          width: '100%',
          padding: 8,
          borderRadius: '8px',
          background: '#fff'
        }}
        value={complements.websiteUrl.concat(
          `/ecommerce/products/${product._id}`
        )}
      /> */}
      <Container>
        <div className='wrapper-container'>
          <article></article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<{
  paths: any;
  fallback: boolean;
}> {
  const productIdList = await fetch({
    method: 'get',
    url: '/api/v1/users/products/public'
  }).then((res) =>
    res.data.map((item: any) => ({ params: { productId: item._id } }))
  );

  return { paths: productIdList, fallback: false };
}

export async function getStaticProps({ params: { productId } }: any) {
  try {
    const { data } = await fetch<Product>({
      method: 'get',
      url: `/api/v1/users/products/public/${productId}`
    });
    return { props: { product: { ...data } }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
