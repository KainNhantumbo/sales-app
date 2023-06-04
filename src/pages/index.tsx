import { IoBagHandle, IoCart } from 'react-icons/io5';
import Image from 'next/image';
import { useEffect } from 'react';
import RequestLogin from '@/components/modals/RequestLogin';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useRouter, NextRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage, complements } from '@/data/app-data';
import { DefaultTheme, useTheme } from 'styled-components';
import { HomeContainer as Container } from '@/styles/common/home';
import { PublicProducts } from '../../@types';
import fetch from '../config/client';
import NewsLetter from '@/components/Newsletter';
import opening_store_png from '../../public/assets/opening.png';
import { actions } from '@/data/actions';
import { PulseLoader } from 'react-spinners';
interface IProps {
  products: PublicProducts[];
}

export default function Home({ products }: IProps): JSX.Element {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, loginPromptController } = useAppContext();

  useEffect((): void => {
    if (products) {
      console.log(state.publicProducts);
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: products
        }
      });
    }
  }, []);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Produtos e Serviços`
      }}>
      <RequestLogin />

      {/* <div className='loading-container'>
        <PulseLoader
          color={`rgb(${theme.primary})`}
          aria-placeholder='Processando...'
          cssOverride={{
            display: 'block'
          }}
        />
      </div> */}
      <Container>
        <section className='banner-container'>
          <div className='wrapper'>
            <div className='banner-title'>
              <h1>
                <IoCart />
                <span>Bem-vindo a nossa loja!</span>
              </h1>
              <h3>
                <span>
                  Use a nossa mágica e encontre tudo que procura e precisa como
                  um foguete...🚀
                </span>
              </h3>
            </div>

            <Image
              width={600}
              height={400}
              blurDataURL={blurDataUrlImage}
              src={opening_store_png}
              alt='openning store art designed by freepick.com'
            />
          </div>
        </section>
        <div className='content-wrapper'>
          <aside></aside>
          <article>
            <section className='products-container'>
              {state.publicProducts.length > 0 &&
                state.publicProducts.map((item) => (
                  <div key={item._id} className='product-container'>
                    <div className='product-image'>
                      {item.images && Object.values(item.images)[0]?.url && (
                        <Image
                          src={Object.values(item.images)[0]?.url}
                          width={200}
                          height={200}
                          alt={`Imagem de ${item.name}`}
                        />
                      )}
                      {!item.images && <IoBagHandle />}
                    </div>
                    <div className='product-details'>
                      <h3>
                        <span>{item.name}</span>
                      </h3>
                      {item.promotion.status ? (
                        <div className='item promo-price'>
                          <span>
                            MZN <i>{item.price}</i>{' '}
                            {(
                              item.price -
                              (item.price * item.promotion.percentage) / 100
                            ).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <span>MZN {item.price.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
            </section>
          </article>
        </div>
        <NewsLetter />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public`
    });
    return { props: { products: [...data] }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
