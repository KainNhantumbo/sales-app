import Layout from '@/components/Layout';
import SearchEngine from '@/components/SearchEngine';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { blurDataUrlImage, constants } from '@/data/constants';
import { formatCurrency } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _home as Container } from '@/styles/common/home';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import {
  IoBagCheck,
  IoBagHandle,
  IoBarcodeOutline,
  IoCart,
  IoCartOutline,
  IoChevronBack,
  IoChevronForward,
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoReload,
  IoSearch
} from 'react-icons/io5';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import fetch from '../config/client';
import { BannerAds, HttpError, PublicProducts } from '../types';

interface Props {
  ads_data: BannerAds[];
}

export default function Home({ ads_data }: Props) {
  const { state, dispatch, addProductToCart, removeProductFromCart, httpClient } =
    useAppContext();
  const { requestLogin } = useModulesContext();
  const theme = useTheme();
  const LIMIT: number = 12;
  const { ref, inView } = useInView();

  const handleFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
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
            })
          ]
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const handleUnFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/products/${id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          publicProducts: [
            ...state.publicProducts.map((product) =>
              product._id === id ? { ...product, favorites: data } : product
            )
          ]
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const fetchPublicProducts = async ({
    pageParam = 0
  }): Promise<{ data: PublicProducts[]; currentOffset: number }> => {
    const { category, promotion, query, sort } = state.queryPublicProducts;

    const queryParams = new URLSearchParams({
      search: query,
      category: category || '',
      offset: Number(LIMIT * pageParam) ? String(LIMIT * pageParam) : '',
      limit: String(LIMIT),
      promotion: promotion !== undefined ? String(Number(promotion)) : String(0),
      sort
    });

    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?${queryParams.toString()}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, refetch, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['public-products'],
      queryFn: fetchPublicProducts,
      getNextPageParam: ({ data, currentOffset }) =>
        data.length >= LIMIT ? currentOffset : undefined
    });

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
          publicProducts: [...reducedPosts]
        }
      });
    }

    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] }
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
    }, 500);

    return () => clearTimeout(timer);
  }, [state.queryPublicProducts]);

  useEffect(() => {
    if (Array.isArray(ads_data)) {
      dispatch({
        type: actions.BANNER_ADS,
        payload: { ...state, banner_ads: [...ads_data] }
      });
    }
  }, []);

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Produtos e Serviços`
      }}>
      <Container>
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
                  isPublicProductsFilters: true
                }
              });
            }}>
            <IoSearch />
            <span>Pesquisar e filtrar produtos</span>
          </motion.button>

          <SearchEngine />

          <article>
            {state.banner_ads.length > 0 ? (
              <section className='banner-container'>
                <ReactImageGallery
                  lazyLoad={true}
                  useBrowserFullscreen={true}
                  additionalClass='navigator'
                  autoPlay={true}
                  showPlayButton={false}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  items={state.banner_ads.map((asset) => ({
                    original: asset.image.url,
                    originalWidth: 1080,
                    originalHeight: 300,

                    originalAlt: `Imagem de ${asset.name}`
                  }))}
                  renderRightNav={(onClick, disabled) => (
                    <button className='nav-right' onClick={onClick} disabled={disabled}>
                      <IoChevronForward />
                    </button>
                  )}
                  renderLeftNav={(onClick, disabled) => (
                    <button className='nav-left' onClick={onClick} disabled={disabled}>
                      <IoChevronBack />
                    </button>
                  )}
                />
              </section>
            ) : null}

            {state.banner_ads.length > 0 ? <>Banner</> : null}

            {state.publicProducts.length < 1 && !isLoading && !isError ? (
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
            ) : null}

            <section className='products-container'>
              {state.publicProducts.length > 0
                ? state.publicProducts.map((item, index) => (
                    <motion.div
                      key={item._id}
                      whileTap={{ scale: 0.98 }}
                      className='product-container'
                      whileHover={{
                        translateY: -8,
                        boxShadow: `0px 12px 25px 10px rgba(${theme.black}, 0.09)`
                      }}
                      ref={state.publicProducts.length === index + 1 ? ref : undefined}>
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
                            if (!state.auth.token) return requestLogin();
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
                            state.cart.some((product) => product.productId === item._id)
                              ? removeProductFromCart(item._id)
                              : addProductToCart({
                                  productId: item._id,
                                  productName: item.name,
                                  price: item.promotion.status
                                    ? item.price -
                                      (item.price * item.promotion.percentage) / 100
                                    : item.price,
                                  quantity: 1,
                                  previewImage: item.image
                                });
                          }}>
                          {state.cart.some((product) => product.productId === item._id) ? (
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
                  ))
                : null}
            </section>

            <div className='stats-container'>
              {isError && !isLoading ? (
                <div className='fetch-error-message '>
                  <h3>Erro ao carregar produtos</h3>
                  <button onClick={() => fetchNextPage()}>
                    <IoReload />
                    <span>Tentar novamente</span>
                  </button>
                </div>
              ) : null}

              {isLoading && !isError ? (
                <div className='loading'>
                  <PulseLoader
                    size={20}
                    color={`rgb(${theme.primary_shade})`}
                    aria-placeholder='Processando...'
                    cssOverride={{
                      display: 'block'
                    }}
                  />
                  <h3>Carregando...</h3>
                </div>
              ) : null}

              {!hasNextPage &&
                !isLoading &&
                !isError &&
                state.publicProducts.length > 0 && <p>Sem mais produtos para mostrar.</p>}
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

export async function getServerSideProps() {
  try {
    const { data } = await fetch<BannerAds[]>({
      method: 'get',
      url: '/api/v1/default/ads/public'
    });
    return { props: { ads_data: data } };
  } catch (error) {
    console.error(
      (error as HttpError).response?.data?.message || (error as HttpError).message
    );
    return { props: { ads_data: [] } };
  }
}
