import { IoBagHandle, IoCart, IoHeart, IoHeartOutline } from 'react-icons/io5';
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
import { useQuery } from '@tanstack/react-query';
interface IProps {
  products: PublicProducts[];
}

export default function Home({ products }: IProps): JSX.Element {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, loginPromptController, fetchAPI } = useAppContext();

  async function getSingleProduct(productId: string): Promise<void> {
    try {
      const { data } = await fetch<PublicProducts>({
        method: 'get',
        url: `/api/v1/users/products/public?productId=${productId}`
      });
      console.log(data);
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleFavoriteProduct(id: string) {
    try {
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
      });
      getSingleProduct(id);
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleUnFavoriteProduct(id: string) {
    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/favorites/products/${id}`
      });
      getSingleProduct(id);
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

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
              placeholder='blur'
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
                      {item.promotion.status && (
                        <span className='promotion'>Promoção {item.promotion.percentage}% </span>
                      )}
                      <button
                        title='Adicionar a lista de favoritos'
                        className='favorite-button'
                        disabled={state.auth?.id === '' && true}
                        onClick={() => {
                          if (!state.auth?.token) {
                            loginPromptController();
                            return;
                          }
                          item.favorites.includes(state.auth?.id)
                            ? handleUnFavoriteProduct(item._id)
                            : handleFavoriteProduct(item._id);
                        }}>
                        {item.favorites.includes(state.auth.id) ? (
                          <IoHeart />
                        ) : (
                          <IoHeartOutline />
                        )}
                      </button>
                      {item.images && Object.values(item.images)[0]?.url && (
                        <Image
                          src={Object.values(item.images)[0]?.url}
                          width={250}
                          height={250}
                          blurDataURL={blurDataUrlImage}
                          placeholder='blur'
                          alt={`Imagem de ${item.name}`}
                        />
                      )}
                      {!item.images && (
                        <IoBagHandle className='no-image-icon' />
                      )}
                    </div>
                    <div className='product-details'>
                      {item.promotion.status ? (
                        <div className='item promo-price'>
                          <h4>
                            <i>MZN </i>
                            <span className='percentage'>
                              {item.price}
                            </span>{' '}
                            {(
                              item.price -
                              (item.price * item.promotion.percentage) / 100
                            ).toFixed(2)}
                          </h4>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <span>
                            <i>MZN </i>
                            {item.price.toFixed(2)}
                          </span>
                        </div>
                      )}
                      <h3>
                        <span>
                          {item.name.length > 65
                            ? item.name.slice(0, 65) + '...'
                            : item.name}{' '}
                        </span>
                      </h3>
                    </div>
                  </div>
                ))}
            </section>
          </article>
        </div>
       
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?page=1`
    });
    return { props: { products: [...data] }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
