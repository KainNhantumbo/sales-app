import {
  IoBagHandle,
  IoBarcodeOutline,
  IoCart,
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoReload,
  IoSearch,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import fetch from '../config/client';
import { actions } from '@/data/actions';
import Layout from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import { PublicProducts } from '../../@types';
import { useAppContext } from '@/context/AppContext';
import SearchEngine from '@/components/SearchEngine';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DefaultTheme, useTheme } from 'styled-components';
import RequestLogin from '@/components/modals/RequestLogin';
import opening_store_png from '../../public/assets/opening.png';
import { blurDataUrlImage, complements } from '@/data/app-data';
import { HomeContainer as Container } from '@/styles/common/home';

interface IProps {
  products: PublicProducts[];
}

export default function Home({ products }: IProps): JSX.Element {
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, loginPromptController, fetchAPI } = useAppContext();

  async function handleFavoriteProduct(id: string) {
    try {
      const { data } = await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`,
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: [
            ...state.publicProducts.map((product) => {
              if (product._id === id) {
                return { ...product, favorites: data };
              }
              return product;
            }),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleUnFavoriteProduct(id: string) {
    try {
      const { data } = await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/favorites/products/${id}`,
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: [
            ...state.publicProducts.map((product) => {
              if (product._id === id) {
                return { ...product, favorites: data };
              }
              return product;
            }),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  const LIMIT = 10;
  const { ref, inView } = useInView();

  const {
    data,
    refetch,
    isRefetching,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isError,
  } = useInfiniteQuery({
    queryKey: ['public-products'],
    queryFn: fetchPublicProducts,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
  });

  async function fetchPublicProducts({
    pageParam = 0,
  }): Promise<{ data: any; currentOffset: number }> {
    const { category, price_range, promotion, query, sort } =
      state.queryPublicProducts;

    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?offset=${
        LIMIT * pageParam
      }&limit=${LIMIT}${category ? `&category=${category}` : ''}${
        price_range > 0 ? `&price_range=${price_range}` : ''
      }${promotion !== undefined ? `&promotion=${String(promotion)}` : ''}${
        query ? `&search=${query}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
    });
    return { data, currentOffset: pageParam + 1 };
  }

  useEffect(() => {
    if (data) {
      const reducedPosts = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: [...reducedPosts],
        },
      });
    }

    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] },
      });
    };
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      refetch({ queryKey: ['public-products'] });
    }, 400);
    return () => {
      clearTimeout(timer);
    };
  }, [state.queryPublicProducts]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Produtos e Serviços`,
      }}>
      <RequestLogin />

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
              alt='Openning store art - designed by freepick.com'
            />
          </div>
        </section>

        <div className='content-wrapper'>
          <button className='openFluentFilters' onClick={()=> {
            dispatch({
              type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
              payload: {
                ...state,
                isPublicProductsFilters: true,
              },
            })
          }}>
            <IoSearch/>
            <span>Pesquisar e filtrar produtos</span>
          </button>
          <SearchEngine />
          <article>
            {state.publicProducts.length < 1 && !isFetching && !isError && (
              <div className='empty-data_container'>
                <section className='content'>
                  <div className='icon'>
                    <IoBarcodeOutline />
                  </div>
                  <div className='message'>
                    {Object.values(state.queryPublicProducts)
                      .map((value) => (value ? true : false))
                      .some((value) => value === true) && (
                      <p> Sua pesquisa não teve resultados</p>
                    )}
                    <h3>Nenhum produto para mostrar.</h3>
                  </div>
                </section>
              </div>
            )}

            <section className='products-container'>
              {state.publicProducts.length > 0 &&
                state.publicProducts.map((item, index) => (
                  <div
                    key={item._id}
                    className='product-container'
                    ref={
                      state.publicProducts.length === index + 1
                        ? ref
                        : undefined
                    }>
                    <div className='product-image'>
                      {item.promotion.status && (
                        <span className='promotion'>
                          Promoção {item.promotion.percentage}%{' '}
                        </span>
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
                        <Link href={`/ecommerce/products/${item._id}`}>
                          <Image
                            src={Object.values(item.images)[0]?.url}
                            width={250}
                            height={250}
                            blurDataURL={blurDataUrlImage}
                            placeholder='blur'
                            alt={`Imagem de ${item.name}`}
                          />
                        </Link>
                      )}
                      {!item.images && (
                        <IoBagHandle className='no-image-icon' />
                      )}
                    </div>
                    <Link
                      href={`/ecommerce/products/${item._id}`}
                      className='product-details'>
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
                    </Link>
                  </div>
                ))}
            </section>

            <div className='stats-container'>
              {isError && !isFetching && (
                <div className=' fetch-error-message '>
                  <h3>Erro ao carregar produtos</h3>
                  <button onClick={() => fetchNextPage()}>
                    <IoReload />
                    <span>Tentar novamente</span>
                  </button>
                </div>
              )}

              {isFetching && !isError && (
                <div className='loading'>
                  <PulseLoader
                    size={20}
                    color={`rgb(${theme.primary_variant})`}
                    aria-placeholder='Processando...'
                    cssOverride={{
                      display: 'block',
                    }}
                  />
                  {isRefetching && <p>Tentando novamente</p>}
                </div>
              )}

              {!hasNextPage &&
                !isFetching &&
                !isError &&
                state.publicProducts.length > 0 && (
                  <p>Sem mais produtos para mostrar</p>
                )}
            </div>

            {state.publicProducts.length > 0 && (
              <div className='posts-container__end-mark'>
                <IoEllipsisHorizontal />
              </div>
            )}
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getServerSideProps(): Promise<
  | { props: { products: PublicProducts[] } }
  | { props: { products?: undefined } }
> {
  try {
    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?offset=0&limit=10`,
    });
    return { props: { products: [...data] } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
