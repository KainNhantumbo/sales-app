import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { blurDataUrlImage, constants } from '@/data/constants';
import { useCartStore } from '@/hooks/use-cart-store';
import { useFavoriteProduct } from '@/hooks/use-favorite-product';
import { useInnerWindowSize } from '@/hooks/use-window-size';
import { formatCurrency } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _favoriteProducts as Container } from '@/styles/common/favorite-products';
import type { PublicProducts } from '@/types';
import { motion } from 'framer-motion';
import type { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import * as Io from 'react-icons/io5';
import { useTheme } from 'styled-components';

type Props = { products: PublicProducts[] };

export default function Page({ products }: Props) {
  const theme = useTheme();
  const { requestLogin } = useModulesContext();
  const { width: windowInnerWidth } = useInnerWindowSize();
  const { onUnFavoriteProduct } = useFavoriteProduct({ key: 'public-products-list' });
  const { state, dispatch } = useAppContext();
  const { addProductToCart, removeProductFromCart } = useCartStore();

  const refetchFavoriteProducts = async () => {
    try {
      const { data } = await fetch<PublicProducts[]>({
        method: 'get',
        url: `/api/v1/users/products/public?favoritesId=${state.auth.id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: data }
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_LIST_DATA,
      payload: { ...state, publicProducts: [...products] }
    });
    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] }
      });
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(constants.defaultTitle, ' | Produtos favoritos')
      }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'favorite-products'} />
          <article>
            <section className='header-container'>
              <h2>
                <Io.IoHeart />
                <span>Seus produtos favoritos</span>
              </h2>
              <p>Aparecerão aqui os produtos que for adicionar a sua lista de favoritos.</p>
            </section>

            {state.publicProducts.length > 0 && (
              <section className='products-container'>
                {state.publicProducts.map((item) => (
                  <motion.div
                    key={item._id}
                    whileTap={{ scale: 0.98 }}
                    className='product-container'
                    whileHover={
                      windowInnerWidth > 445
                        ? {
                            translateY: -8,
                            boxShadow: `0px 12px 25px 10px rgba(${theme.black}, 0.09)`
                          }
                        : undefined
                    }>
                    <div className='product-image'>
                      {item.promotion.status && (
                        <span className='promotion'>
                          Promoção {item.promotion.percentage}%{' '}
                        </span>
                      )}
                      <button
                        title='Remover da lista de favoritos'
                        aria-label='Remover da lista de favoritos'
                        className='favorite-button'
                        onClick={() => {
                          if (!state.auth.id) return requestLogin();
                          onUnFavoriteProduct(item._id);
                          refetchFavoriteProducts();
                        }}>
                        <Io.IoHeart />
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
                        <span>Detalhes</span>
                      </button>
                      {item.promotion.status ? (
                        <div className='item promo-price'>
                          <h4>
                            <span className='old-price'>{formatCurrency(item.price)}</span>{' '}
                            <span className='actual-price'>
                              {formatCurrency(
                                item.price - (item.price * item.promotion.percentage) / 100
                              )}
                            </span>
                          </h4>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <span className='actual-price'>{formatCurrency(item.price)}</span>
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
            )}

            {state.publicProducts.length < 1 && (
              <div className='empty-data_container'>
                <section className='content'>
                  <Io.IoBarcodeOutline />
                  <h3>
                    <span>Sem produtos para mostrar</span>
                    <p>Adicione alguns produtos a sua lista de favoritos</p>
                  </h3>
                </section>
              </div>
            )}
          </article>
        </div>
      </Container>
    </Layout>
  );
}

type Context = GetServerSidePropsContext;

export async function getServerSideProps(context: Context) {
  try {
    const { data } = await fetch<PublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?favoritesId=${context.query.id}`
    });
    return { props: { products: [...data] } };
  } catch (error) {
    console.error(error);
    return { props: { products: [] } };
  }
}
