import {
  IoBagCheck,
  IoBagHandle,
  IoBarcodeOutline,
  IoCart,
  IoCartOutline,
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
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { actions } from '@/data/actions';
import { formatCurrency } from '@/lib/utils';
import { PulseLoader } from 'react-spinners';
import { TPublicProducts } from '@/../@types';
import { useAppContext } from '@/context/AppContext';
import SearchEngine from '@/components/SearchEngine';
import { useInfiniteQuery } from '@tanstack/react-query';
import { DefaultTheme, useTheme } from 'styled-components';
import RequestLogin from '@/components/modals/RequestLogin';
import opening_store_png from '../../public/assets/opening.png';
import { blurDataUrlImage, complements } from '@/data/app-data';
import { HomeContainer as Container } from '@/styles/common/home';
import { InViewHookResponse, useInView } from 'react-intersection-observer';

export default function Home(): JSX.Element {
  const {
    state,
    dispatch,
    loginPromptController,
    addProductToCart,
    removeProductFromCart,
    fetchAPI,
  } = useAppContext();
  const theme: DefaultTheme = useTheme();
  const LIMIT: number = 12;
  const { ref, inView }: InViewHookResponse = useInView();

  async function handleFavoriteProduct(id: string): Promise<void> {
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

  async function handleUnFavoriteProduct(id: string): Promise<void> {
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

  const { data, refetch, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
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

    const { data } = await fetch<TPublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?offset=${
        LIMIT * pageParam
      }&limit=${LIMIT}${category ? `&category=${category}` : ''}${
        price_range > 0 ? `&max_price=${price_range}` : ''
      }${promotion !== undefined ? `&promotion=${String(promotion)}` : ''}${
        query ? `&search=${query}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
    });
    return { data, currentOffset: pageParam + 1 };
  }

  useEffect((): (() => void) => {
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

    return (): void => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] },
      });
    };
  }, [data]);

  useEffect((): void => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect((): (() => void) => {
    const timer = setTimeout(() => {
      refetch({ queryKey: ['public-products'] });
    }, 500);
    return (): void => {
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
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className='openFluentFilters'
            onClick={() => {
              dispatch({
                type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                payload: {
                  ...state,
                  isPublicProductsFilters: true,
                },
              });
            }}>
            <IoSearch />
            <span>Pesquisar e filtrar produtos</span>
          </motion.button>
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
                  <motion.div
                    key={item._id}
                    whileTap={{ scale: 0.98 }}
                    className='product-container'
                    whileHover={{
                      translateY: -8,
                      boxShadow: `0px 12px 25px 10px rgba(${theme.accent}, 0.09)`,
                    }}
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
                        aria-label='Adicionar a lista de favoritos'
                        className='favorite-button'
                        onClick={() => {
                          if (!state.auth.token) return loginPromptController();
                          else if (item.favorites.includes(state.auth?.id))
                            return handleUnFavoriteProduct(item._id);
                          return handleFavoriteProduct(item._id);
                        }}>
                        {item.favorites.includes(state.auth.id) ? (
                          <IoHeart />
                        ) : (
                          <IoHeartOutline />
                        )}
                      </button>
                      <button
                        title='Adicionar ao carrinho'
                        aria-label='Adicionar ao carrinho'
                        className='cart-button'
                        onClick={() => {
                          state.cart.some(
                            (product) => product.productId === item._id
                          )
                            ? removeProductFromCart(item._id)
                            : addProductToCart({
                                productId: item._id,
                                productName: item.name,
                                price: item.promotion.status
                                  ? item.price -
                                    (item.price * item.promotion.percentage) /
                                      100
                                  : item.price,
                                quantity: 1,
                                previewImage: item.image,
                              });
                        }}>
                        {state.cart.some(
                          (product) => product.productId === item._id
                        ) ? (
                          <IoCart />
                        ) : (
                          <IoCartOutline />
                        )}
                      </button>
                      {item.image && (
                        <Link href={`/ecommerce/products/${item._id}`}>
                          <Image
                            src={item.image.url}
                            width={250}
                            height={250}
                            blurDataURL={blurDataUrlImage}
                            placeholder='blur'
                            alt={`Imagem de ${item.name}`}
                          />
                        </Link>
                      )}
                      {!item.image && (
                        <Link href={`/ecommerce/products/${item._id}`}>
                          <IoBagHandle className='no-image-icon' />
                        </Link>
                      )}
                    </div>
                    <Link
                      href={`/ecommerce/products/${item._id}`}
                      className='product-details'>
                      <button className='buy-mobile-button'>
                        <IoBagCheck />
                        <span>Comprar agora</span>
                      </button>
                      {item.promotion.status ? (
                        <div className='item promo-price'>
                          <h4>
                            <span className='old-price'>
                              {formatCurrency(item.price)}
                            </span>{' '}
                            <span className='actual-price'>
                              {formatCurrency(
                                item.price -
                                  (item.price * item.promotion.percentage) / 100
                              )}
                            </span>
                          </h4>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <span className='actual-price'>
                            {formatCurrency(item.price)}
                          </span>
                        </div>
                      )}

                      <h3>
                        <span>
                          {item.name.length > 40
                            ? item.name.slice(0, 40) + '...'
                            : item.name}{' '}
                        </span>
                      </h3>
                    </Link>
                  </motion.div>
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
