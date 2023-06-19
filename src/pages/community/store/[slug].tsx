import {
  PublicProducts,
  TPublicProduct,
  TPublicStore,
} from '../../../../@types';
import {
  IoBagCheck,
  IoBagHandle,
  IoCart,
  IoCartOutline,
  IoDocuments,
  IoHeart,
  IoHeartOutline,
  IoLayers,
  IoLogoFacebook,
  IoLogoWhatsapp,
  IoStorefront,
} from 'react-icons/io5';
import Link from 'next/link';
import Layout from '@/components/Layout';
import fetch from '../../../config/client';
import ErrorPage from '@/pages/error-page';
import { NextRouter, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { BiUser } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { actions } from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { FaInstagram, FaLink, FaLinkedinIn } from 'react-icons/fa';
import { StoreContainer as Container } from '@/styles/common/community-store-profile';
import { DefaultTheme, useTheme } from 'styled-components';
import { blurDataUrlImage } from '@/data/app-data';

type TProps = { store: TPublicStore; products: TPublicProduct[] };
type TSocialNetwork =
  | {
      website: string | undefined;
      whatsapp: string | undefined;
      instagram: string | undefined;
      facebook: string | undefined;
      linkedin: string | undefined;
    }
  | undefined;

export default function StoreProfile({ store, products }: TProps): JSX.Element {
  const {
    state,
    dispatch,
    fetchAPI,
    loginPromptController,
    addProductToCart,
    removeProductFromCart,
  } = useAppContext();
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const [tab, setTab] = useState<'docs' | 'products'>('docs');
  const [innerWidth, setInnerWidth] = useState(0);

  if (!store) return <ErrorPage retryFn={() => router.reload()} />;

  function formatSocialNetwork(data: TSocialNetwork) {
    if (data) {
      return Object.entries(data)
        .map(([key, value]) => {
          switch (key) {
            case 'facebook':
              return {
                name: 'Facebook',
                url: value,
                icon: IoLogoFacebook,
              };
            case 'instagram':
              return {
                name: 'Instagram',
                url: value,
                icon: FaInstagram,
              };
            case 'website':
              return {
                name: 'Website',
                url: value,
                icon: FaLink,
              };
            case 'linkedin':
              return {
                name: 'LinkedIn',
                url: value,
                icon: FaLinkedinIn,
              };
            case 'whatsapp':
              return {
                name: 'Whatsapp',
                url: value,
                icon: IoLogoWhatsapp,
              };
            default:
              return undefined;
          }
        })
        .sort((a, b) => {
          if (a && b) {
            if (a.name > b.name) return 1;
            return -1;
          }
          return 1;
        });
    }
  }

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

    function changeWidth(): void {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth > 830) {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: true,
        },
      });
    } else {
      dispatch({
        type: actions.PUBLIC_PRODUCTS_FILTERS_MENU,
        payload: {
          ...state,
          isPublicProductsFilters: false,
        },
      });
    }
  }

  useEffect((): (() => void) => {
    console.info(store);
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
    <Layout>
      <Container>
        <div className='wrapper-container '>
          <aside>
            <section className='profile-container'>
              <div className='image-container'>
                {store.created_by.profile_image?.url && (
                  <Image
                    width={620}
                    height={220}
                    className='cover-image'
                    src={store.created_by.profile_image.url}
                    alt={`Imagem de perfil do proprietário da ${store.name}`}
                  />
                )}
                {!store.cover_image?.url && <BiUser className='camera-icon' />}
              </div>
              <h3 className='author-name'>
                <span>{`${store.created_by.first_name} ${store.created_by.last_name}`}</span>
              </h3>
              {store.created_by.social_network && (
                <div className='network-buttons'>
                  {formatSocialNetwork(store.created_by.social_network)?.map(
                    (option, index) => (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        href={option?.url}
                        title={option?.name}
                        aria-label={option?.name}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        key={String(index)}>
                        {option?.icon && <option.icon />}
                      </motion.a>
                    )
                  )}
                </div>
              )}
            </section>
          </aside>
          <article>
            <div className='image-container'>
              {store.cover_image?.url && (
                <Image
                  width={620}
                  height={220}
                  className='cover-image'
                  src={store.cover_image.url}
                  alt={`Imagem de capa da loja ${store.name}`}
                />
              )}
              {!store.cover_image?.url && (
                <IoStorefront className='camera-icon' />
              )}
            </div>
            <section className='store-data'>
              <section className='store-details'>
                <div>
                  <div className='title-slogan'>
                    <h2 className='name'>
                      <span>{store.name}</span>
                    </h2>
                    <h4>
                      <span>"{store.slogan}"</span>
                    </h4>
                  </div>
                  <p className='category'>
                    Oferece serviços/produtos relacionados a{' '}
                    <i>{store.category}</i>.
                  </p>
                </div>

                {store.location && (
                  <div className='location'>
                    <p>
                      Localizada em <span>{store.location.country}</span> -
                      {store.location?.state && (
                        <span> {store.location.state}</span>
                      )}{' '}
                      <span>{store.location.adress}</span>
                    </p>
                  </div>
                )}
              </section>

              <div className='tab-buttons-container'>
                <button className='docs' onClick={() => setTab('docs')}>
                  <IoDocuments />
                  <span>Documentação</span>
                </button>
                <button className='products' onClick={() => setTab('products')}>
                  <IoLayers />
                  <span>Produtos</span>
                </button>
              </div>

              {tab === 'docs' && (
                <section className='docs-container'>
                  {store.privacy_policy && (
                    <section className='store-privacy-policy'>
                      {store.privacy_policy.includes('\n') ? (
                        store.privacy_policy
                          .split('\n')
                          .map((phrase, index) => (
                            <p key={String(index)}>{phrase}</p>
                          ))
                      ) : (
                        <p>{store.privacy_policy}</p>
                      )}
                    </section>
                  )}
                </section>
              )}
              {tab === 'products' && products && products.length > 0 && (
                <section className='products-container'>
                  {products.map((item) => (
                    <motion.div
                      key={item._id}
                      whileTap={{ scale: 0.98 }}
                      className='product-container'
                      whileHover={{
                        translateY: -8,
                        boxShadow: `0px 12px 25px 10px rgba(${theme.accent}, 0.09)`,
                      }}>
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
                            if (!state.auth?.token)
                              return loginPromptController();
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
                          <span>Comprar agora</span>
                        </button>
                        {item.promotion.status ? (
                          <div className='item promo-price'>
                            <h4>
                              <span className='old-price'>
                                {new Intl.NumberFormat('pt-BR', {
                                  currency: 'MZN',
                                  style: 'currency',
                                }).format(item.price)}
                              </span>{' '}
                              <span className='actual-price'>
                                {new Intl.NumberFormat('pt-BR', {
                                  currency: 'MZN',
                                  style: 'currency',
                                }).format(
                                  item.price -
                                    (item.price * item.promotion.percentage) /
                                      100
                                )}
                              </span>
                            </h4>
                          </div>
                        ) : (
                          <div className='item promo-price'>
                            <span className='actual-price'>
                              {new Intl.NumberFormat('pt-BR', {
                                currency: 'MZN',
                                style: 'currency',
                                useGrouping: true,
                              }).format(item.price)}
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
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await fetch<TPublicProduct[]>({
    method: 'get',
    url: '/api/v1/users/store/all?fields=name',
  }).then((res) => res.data.map((item) => ({ params: { slug: item._id } })));
  return { paths: slugs, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const [storeData, storeProductsData] = (
      await Promise.all([
        fetch<TPublicStore>({
          method: 'get',
          url: `/api/v1/users/store/public/${slug}`,
        }),
        fetch<PublicProducts[]>({
          method: 'get',
          url: `/api/v1/users/products/public?storeId=${slug}`,
        }),
      ])
    ).map((res) => res.data);

    return {
      props: { store: storeData, products: storeProductsData },
      revalidate: 10,
    };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
