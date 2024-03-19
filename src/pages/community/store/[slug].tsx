import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { blurDataUrlImage, constants, formatSocialNetwork } from '@/data/constants';
import { useCartStore } from '@/hooks/use-cart-store';
import { formatCurrency, slidePageUp } from '@/lib/utils';
import ErrorPage from '@/pages/error-page';
import { actions } from '@/shared/actions';
import { _store as Container } from '@/styles/common/community-store-profile';
import { HttpError, PublicProducts, PublicStore } from '@/types';
import { motion } from 'framer-motion';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BiUser } from 'react-icons/bi';
import {
  IoAlertCircle,
  IoBagCheck,
  IoBagHandle,
  IoBarcodeOutline,
  IoCart,
  IoCartOutline,
  IoDocuments,
  IoEllipsisHorizontal,
  IoHeart,
  IoHeartOutline,
  IoLayers,
  IoLibrary,
  IoStorefront
} from 'react-icons/io5';
import { VscVerifiedFilled } from 'react-icons/vsc';
import { useTheme } from 'styled-components';

type Props = { store?: PublicStore; products: PublicProducts[] };

export default function Page({ store, products }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();
  const { addProductToCart, removeProductFromCart } = useCartStore();
  const { requestLogin } = useModulesContext();
  const [tab, setTab] = useState<'docs' | 'products'>('docs');
  const [innerWidth, setInnerWidth] = useState<number>(0);

  async function handleFavoriteProduct(id: string) {
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
  }

  async function handleUnFavoriteProduct(id: string) {
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
  }

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    dispatch({
      type: actions.PUBLIC_PRODUCTS_LIST_DATA,
      payload: { ...state, publicProducts: [...products] }
    });
    window.addEventListener('resize', () => {
      setInnerWidth(window.innerWidth);
    });
    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_LIST_DATA,
        payload: { ...state, publicProducts: [] }
      });
      window.removeEventListener('resize', () => {
        setInnerWidth(window.innerWidth);
      });
    };
  }, []);

  if (!store || Object.values(store).length < 1)
    return (
      <ErrorPage
        title='Loja Inativa'
        message='A loja que procura pode estar atualmente indisponível. Peça ao proprietário para ativá-la.'
        button_message='Voltar para página anterior'
        retryFn={() => router.back()}
      />
    );

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Loja ${store.name}`,
        createdAt: store.createdAt,
        updatedAt: store.createdAt
      }}>
      <Container>
        <div className='wrapper-container '>
          <aside>
            <section className='profile-container'>
              <div className='image-container'>
                {store.created_by.profile_image?.url ? (
                  <Image
                    width={620}
                    height={220}
                    className='cover-image'
                    src={store.created_by.profile_image.url}
                    alt={`Imagem de perfil do proprietário da ${store.name}`}
                  />
                ) : (
                  <BiUser className='camera-icon' />
                )}
              </div>
              <h3 className='author-name'>
                <span>{`${store.created_by.first_name} ${store.created_by.last_name}`}</span>
              </h3>
              <h5 className='email'>
                <span>{store.created_by.email}</span>
              </h5>
              {store.created_by.social_network && (
                <div className='network-buttons'>
                  {formatSocialNetwork({
                    ...store.created_by.social_network
                  })?.map((option, index) => (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      href={String(option?.url)}
                      title={option?.name}
                      aria-label={option?.name}
                      target={'_blank'}
                      rel={'noreferrer noopener'}
                      key={String(index)}>
                      {option?.icon && <option.icon />}
                    </motion.a>
                  ))}
                </div>
              )}
              <motion.div
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.8 }}
                className='profile-anchor'>
                <Link
                  href={`/community/profile/${store.created_by._id}`}
                  className='profile-anchor'>
                  <BiUser />
                  <span>Visitar perfil</span>
                </Link>
              </motion.div>
            </section>
            <SideBarAds key={'store-profile'} />
          </aside>
          <article>
            <div className='image-container'>
              {store.cover_image?.url ? (
                <Image
                  width={620}
                  height={220}
                  className='cover-image'
                  src={store.cover_image.url}
                  title={`Imagem de capa da loja ${store.name}`}
                  aria-label={`Imagem de capa da loja ${store.name}`}
                  alt={`Imagem de capa da loja ${store.name}`}
                />
              ) : (
                <IoStorefront className='no-image-icon' />
              )}

              <h5>
                {store.verified_store ? (
                  <>
                    <VscVerifiedFilled />
                    <span>Loja verificada</span>
                  </>
                ) : (
                  <>
                    <IoAlertCircle className='alert' />
                    <span className='alert'>Loja não verificada</span>
                  </>
                )}
              </h5>
            </div>
            <section className='store-data'>
              <section className='store-details'>
                <div className='title-slogan'>
                  <h2 className='name'>
                    <span>{store.name}</span>
                  </h2>
                  <h4>
                    <span>"{store.slogan}"</span>
                  </h4>
                </div>
                <p className='category'>
                  Oferece serviços/produtos relacionados a <i>{store.category}</i>.
                </p>
                <p className='description'>
                  <strong>Descrição:</strong> {store.description}
                </p>

                {store.location && (
                  <p className='location'>
                    Localizada em <span>{store.location.country}</span> -
                    {store.location?.state && <span> {store.location.state}</span>}{' '}
                    <span>{store.location.address}</span>
                  </p>
                )}
              </section>

              <div className='tab-buttons-container'>
                <button
                  className='docs'
                  onClick={() => {
                    setTab('docs');
                    slidePageUp();
                  }}>
                  <IoDocuments />
                  <span>Documentação</span>
                </button>
                <button
                  className='products'
                  onClick={() => {
                    setTab('products');
                    slidePageUp();
                  }}>
                  <IoLayers />
                  <span>Produtos</span>
                </button>
              </div>

              {tab === 'docs' && (
                <section className='docs-container'>
                  {store.privacy_policy && (
                    <section className='data-container'>
                      <h3>
                        <IoEllipsisHorizontal />
                        <span>Política de Privacidade</span>
                      </h3>
                      <div className='content'>
                        {store.privacy_policy.includes('\n') ? (
                          store.privacy_policy
                            .split('\n')
                            .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                        ) : (
                          <p>{store.privacy_policy}</p>
                        )}
                      </div>
                    </section>
                  )}
                  {store.terms_policy && (
                    <section className='data-container'>
                      <h3>
                        <IoEllipsisHorizontal />
                        <span>Termos e Condições</span>
                      </h3>
                      <div className='content'>
                        {store.terms_policy.includes('\n') ? (
                          store.terms_policy
                            .split('\n')
                            .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                        ) : (
                          <p>{store.terms_policy}</p>
                        )}
                      </div>
                    </section>
                  )}
                  {store.delivery_policy && (
                    <section className='data-container data-container_last'>
                      <h3>
                        <IoEllipsisHorizontal />
                        <span>Política de Entrega de Produtos</span>
                      </h3>
                      <div className='content '>
                        {store.delivery_policy.includes('\n') ? (
                          store.delivery_policy
                            .split('\n')
                            .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                        ) : (
                          <p>{store.delivery_policy}</p>
                        )}
                      </div>
                    </section>
                  )}

                  {!store.privacy_policy &&
                    !store.delivery_policy &&
                    !store.terms_policy && (
                      <div className='empty-data_container'>
                        <section className='content'>
                          <IoLibrary />
                          <h3>
                            <span>Loja sem documentação.</span>
                          </h3>
                        </section>
                      </div>
                    )}
                </section>
              )}
              {tab === 'products' && state.publicProducts.length > 0 && (
                <section className='products-container'>
                  {state.publicProducts.map((item) => (
                    <motion.div
                      key={item._id}
                      whileTap={{ scale: 0.98 }}
                      className='product-container'
                      whileHover={
                        innerWidth > 445
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
                          title='Adicionar a lista de favoritos'
                          aria-label='Adicionar a lista de favoritos'
                          className='favorite-button'
                          onClick={() => {
                            if (!state.auth?.token) return requestLogin();
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

              {tab === 'products' && state.publicProducts.length < 1 && (
                <div className='empty-data_container'>
                  <section className='content'>
                    <IoBarcodeOutline />
                    <h3>
                      <span>Nenhum produto para mostrar</span>
                    </h3>
                  </section>
                </div>
              )}
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

type Context = GetServerSidePropsContext;

export async function getServerSideProps(context: Context) {
  try {
    const [storeData, storeProductsData] = (
      await Promise.all([
        fetch<PublicStore>({
          method: 'get',
          url: `/api/v1/users/store/public/${context.params?.slug}`
        }),
        fetch<PublicProducts[]>({
          method: 'get',
          url: `/api/v1/users/products/public?storeId=${context.params?.slug}`
        })
      ])
    ).map((res) => res.data);

    return {
      props: { store: storeData, products: storeProductsData }
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
