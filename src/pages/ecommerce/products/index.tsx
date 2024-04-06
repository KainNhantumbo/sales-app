import Layout from '@/components/layout';
import { ProductsSearch } from '@/components/products-search';
import client from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { blurDataUrlImage, constants } from '@/data/constants';
import { useCartStore } from '@/hooks/use-cart-store';
import { useFavoriteProduct } from '@/hooks/use-favorite-product';
import { usePublicProductsQuery } from '@/hooks/use-public-products-query';
import { errorTransformer } from '@/lib/error-transformer';
import { formatCurrency } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _home as Container } from '@/styles/common/home';
import type { HttpError, PublicAds } from '@/types';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import * as Io from 'react-icons/io5';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

type Props = { advertisements: PublicAds };

export default function Page({ advertisements }: Props) {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const { requestLogin } = useModulesContext();
  const { addProductToCart, removeProductFromCart } = useCartStore();
  const { fetchNextPage, hasNextPage, inViewRef, isLoading, isError } =
    usePublicProductsQuery();

  const { onFavoriteProduct, onUnFavoriteProduct } = useFavoriteProduct({
    key: 'public-products-list'
  });

  const bannerAds: PublicAds = React.useMemo(() => {
    if (typeof advertisements !== 'undefined' && Array.isArray(advertisements))
      return advertisements;
    return [];
  }, [advertisements]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Produtos e Serviços` }}>
      <Container>
        <div className='content-wrapper'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            className='openFluentFilters'
            onClick={() =>
              dispatch({
                type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
                payload: { ...state, isPublicProductsFilters: true }
              })
            }>
            <Io.IoSearch />
            <span>Pesquisar e Filtros</span>
          </motion.button>

          <ProductsSearch />

          <article>
            {bannerAds.length > 0 ? (
              <section className='banner-container'>
                <ReactImageGallery
                  lazyLoad={true}
                  useBrowserFullscreen={true}
                  additionalClass='navigator'
                  autoPlay={true}
                  showPlayButton={false}
                  showThumbnails={false}
                  showFullscreenButton={false}
                  items={bannerAds.map((asset) => ({
                    original: asset.image.url,
                    originalWidth: 1080,
                    originalHeight: 300,
                    originalAlt: `Imagem de ${asset.name}`
                  }))}
                  renderRightNav={(onClick, disabled) => (
                    <button className='nav-right' onClick={onClick} disabled={disabled}>
                      <Io.IoChevronForward />
                    </button>
                  )}
                  renderLeftNav={(onClick, disabled) => (
                    <button className='nav-left' onClick={onClick} disabled={disabled}>
                      <Io.IoChevronBack />
                    </button>
                  )}
                />
              </section>
            ) : null}

            {bannerAds.length > 0 ? <>Banner</> : null}

            {state.publicProducts.length < 1 && !isLoading && !isError ? (
              <div className='empty-data_container'>
                <section className='content'>
                  <div className='icon'>
                    <Io.IoBarcodeOutline />
                  </div>
                  <div className='message'>
                    {Object.values(state.queryPublicProducts)
                      .map((value) => (value ? true : false))
                      .some((value) => value === true) && (
                      <p>Sua pesquisa não teve resultados</p>
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
                      ref={
                        state.publicProducts.length === index + 1 ? inViewRef : undefined
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
                            if (!state.auth.token) return requestLogin();
                            else if (item.favorites.includes(state.auth?.id))
                              return onUnFavoriteProduct(item._id);
                            return onFavoriteProduct(item._id);
                          }}>
                          {item.favorites.includes(state.auth.id) ? (
                            <Io.IoHeart />
                          ) : (
                            <Io.IoHeartOutline />
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
                            <Io.IoCart />
                          ) : (
                            <Io.IoCartOutline />
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
                            <Io.IoBagHandle className='no-image-icon' />
                          </Link>
                        )}
                      </div>
                      <Link
                        href={`/ecommerce/products/${item._id}`}
                        className='product-details'>
                        <button className='buy-mobile-button'>
                          <Io.IoBagCheck />
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
                    <Io.IoReload />
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
                <Io.IoEllipsisHorizontal />
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
    const { data } = await client.get<PublicAds>('/api/v1/default/ads/public');
    return { props: { advertisements: data } };
  } catch (error) {
    console.error(error);
    console.error(errorTransformer(error as HttpError));
    return { props: { advertisements: [] } };
  }
}