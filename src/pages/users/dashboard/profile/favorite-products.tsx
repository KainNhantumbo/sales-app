import {
  IoAdd,
  IoBagCheck,
  IoBagHandle,
  IoBarcodeOutline,
  IoCart,
  IoCartOutline,
  IoHeart,
  IoHeartOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaAd } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { actions } from '@/data/actions';
import Layout from '@/components/Layout';
import { formatCurrency } from '@/lib/utils';
import { blurDataUrlImage, complements } from '@/data/app-data';
import fetch from '../../../../config/client';
import { GetServerSidePropsContext } from 'next';
import { useAppContext } from '@/context/AppContext';
import { DefaultTheme, useTheme } from 'styled-components';
import type { PublicProducts as TPublicProducts } from '@/../@types';
import { FavoriteProductsContainer as Container } from '@/styles/common/user-favorite-products';

type TProps = { products: TPublicProducts[] };
export default function FavoriteProducts({ products }: TProps): JSX.Element {
  const {
    state,
    dispatch,
    addProductToCart,
    removeProductFromCart,
    fetchAPI,
    loginPromptController,
  } = useAppContext();
  const theme: DefaultTheme = useTheme();
  const [innerWidth, setInnerWidth] = useState(0);

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

  useEffect((): (() => void) => {
    dispatch({
      type: actions.PUBLIC_PRODUCTS_LIST_DATA,
      payload: { ...state, publicProducts: [...products] },
    });
    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] },
      });
    };
  }, []);

  useEffect((): (() => void) => {
    setInnerWidth(window.innerWidth);
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
      });
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(
          complements.defaultTitle,
          ' | Produtos favoritos'
        ),
      }}>
      <Container>
        <div className='wrapper-container'>
          <aside>
            <section className='no-ads'>
              <FaAd className='ads-icon' />
              <h3>
                <span>Espaço reservado para anúncios</span>
              </h3>
              <Link href={``}>
                <IoAdd />
                <span>Criar anúncio</span>
              </Link>
            </section>
          </aside>
          <article>
            <section className='header-container'>
              <h2>
                <IoHeart />
                <span>Seus produtos favoritos</span>
              </h2>
              <p>
                Aparecerão aqui os produtos que for adicionar a sua lista de
                favoritos.
              </p>
            </section>

            {state.publicProducts.length > 0 && (
              <section className='products-container'>
                {products.map((item) => (
                  <motion.div
                    key={item._id}
                    whileTap={{ scale: 0.98 }}
                    className='product-container'
                    whileHover={
                      innerWidth > 445
                        ? {
                            translateY: -8,
                            boxShadow: `0px 12px 25px 10px rgba(${theme.accent}, 0.09)`,
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
                          if (!state.auth.id) return loginPromptController();
                          return handleUnFavoriteProduct(item._id);
                        }}>
                        <IoHeart />
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
                                previewImage: item.images
                                  ? {
                                      id: Object.values(item.images)[0]?.id,
                                      url: Object.values(item.images)[0]?.url,
                                    }
                                  : undefined,
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
                        <span>Ver os detalhes</span>
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
            )}

            {state.publicProducts.length < 1 && (
              <div className='empty-data_container'>
                <section className='content'>
                  <IoBarcodeOutline />
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

type TContext = GetServerSidePropsContext;

export async function getServerSideProps(context: TContext) {
  try {
    const { data } = await fetch<TPublicProducts[]>({
      method: 'get',
      url: `/api/v1/users/products/public?favoritesId=${context.query.id}`,
    });

    return { props: { products: [...data] } };
  } catch (error) {
    console.error(error);
    return { props: { products: [] } };
  }
}
