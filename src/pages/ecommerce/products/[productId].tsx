import {
  IoAdd,
  IoBagHandle,
  IoCartOutline,
  IoChevronBack,
  IoChevronForward,
  IoContract,
  IoEllipsisHorizontal,
  IoEyeOff,
  IoFlame,
  IoHeart,
  IoHeartOutline,
  IoPaperPlane,
  IoRemove,
  IoScan,
  IoShareSocial,
  IoStorefront,
} from 'react-icons/io5';
import { useEffect, useState } from 'react';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import ErrorPage from '@/pages/error-page';
import { NextRouter, useRouter } from 'next/router';
import fetch from '../../../config/client';
import { Product } from '../../../../@types';
import RequestLogin from '@/components/modals/RequestLogin';
import ShareProducts from '@/components/modals/ShareProductModal';
import { useAppContext } from '@/context/AppContext';
import 'react-image-gallery/styles/css/image-gallery.css';
import ReactImageGallery from 'react-image-gallery';
import { useTheme } from 'styled-components';
import { actions } from '@/data/actions';
import { EcommerceProductContainer as Container } from '@/styles/common/ecommerce-product';
import Comments from '@/components/comments/Comments';
import NewsLetter from '@/components/Newsletter';
import Link from 'next/link';

export default function Product({ product }: any): JSX.Element {
  const {
    state,
    dispatch,
    fetchAPI,
    loginPromptController,
    shareProductController,
  } = useAppContext();
  const theme = useTheme();
  const [innerWidth, setInnerWidth] = useState(0);
  const router: NextRouter = useRouter();

  if (!product) {
    return <ErrorPage retryFn={router.reload} />;
  }

  async function handleFavoriteProduct(id: string) {
    try {
      const { data } = await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`,
      });
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, favorites: data },
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
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, favorites: data },
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  function trackInnerWidth(): void {
    setInnerWidth(window.innerWidth);
    if (window.innerWidth > 830) {
      //  do something
    } else {
      //  do something
    }
  }

  useEffect((): (() => void) => {
    trackInnerWidth();
    window.addEventListener('resize', trackInnerWidth);
    return () => {
      window.removeEventListener('resize', trackInnerWidth);
    };
  }, []);

  useEffect(() => {
    console.log(product);
    if (product) {
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, ...product },
        },
      });
    }
  }, []);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | ${product.name}`,
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt,
      }}>
      <Container>
        <ShareProducts
          productId={state.publicProduct._id}
          category={state.publicProduct.category}
          name={state.publicProduct.name}
        />
        <RequestLogin />

        <div className='wrapper-container'>
          <aside>
            <div className='images-container'>
              {state.publicProduct.images && (
                <ReactImageGallery
                  items={Object.values(state.publicProduct.images).map(
                    (image) => ({
                      thumbnail: image.url,
                      original: image.url,
                    })
                  )}
                  lazyLoad={true}
                  thumbnailPosition={innerWidth > 420 ? 'left' : 'bottom'}
                  useBrowserFullscreen={true}
                  additionalClass='navigator'
                  autoPlay={false}
                  showPlayButton={false}
                  renderRightNav={(onClick, disabled) => (
                    <button
                      className='nav-right'
                      onClick={onClick}
                      disabled={disabled}>
                      <IoChevronForward />
                    </button>
                  )}
                  renderLeftNav={(onClick, disabled) => (
                    <button
                      className='nav-left'
                      onClick={onClick}
                      disabled={disabled}>
                      <IoChevronBack />
                    </button>
                  )}
                  renderFullscreenButton={(onClick, isFullScreen) => (
                    <button className='nav-fullscreen' onClick={onClick}>
                      {isFullScreen ? <IoContract /> : <IoScan />}
                    </button>
                  )}
                />
              )}

              {!product.images && <IoBagHandle className='no-image-icon' />}
            </div>

            <section className='product-container'>
              <div className='product-name'>
                <h1>
                  <span>{state.publicProduct.name}</span>
                </h1>
                <p>
                  Categorizado em <i>{state.publicProduct.category}</i>.
                </p>
              </div>

              <section className='front-container'>
                <div className='product-details'>
                  {state.publicProduct.promotion.status ? (
                    <div className='price-container'>
                      <p className='promo-alert'>
                        <IoFlame />
                        <span>PROMO</span>
                      </p>{' '}
                      <span className='actual-price'>
                        {new Intl.NumberFormat('pt-BR', {
                          currency: 'MZN',
                          style: 'currency',
                        }).format(
                          state.publicProduct.price -
                            (state.publicProduct.price *
                              state.publicProduct.promotion.percentage) /
                              100
                        )}
                      </span>
                    </div>
                  ) : (
                    <div className='price-container'>
                      <span className='actual-price'>
                        {new Intl.NumberFormat('pt-BR', {
                          currency: 'MZN',
                          style: 'currency',
                          useGrouping: true,
                        }).format(state.publicProduct.price)}
                      </span>
                    </div>
                  )}
                </div>

                <div className='actions-container'>
                  <button
                    title='Adicionar a lista de favoritos'
                    className='favorite-button'
                    onClick={() => {
                      if (!state.auth?.id) return loginPromptController();
                      if (
                        state.publicProduct.favorites.includes(state.auth?.id)
                      )
                        return handleUnFavoriteProduct(state.publicProduct._id);
                      return handleFavoriteProduct(state.publicProduct._id);
                    }}>
                    {state.publicProduct.favorites.includes(state.auth.id) ? (
                      <>
                        <IoHeart />
                        <span>Adicionado aos favoritos</span>
                      </>
                    ) : (
                      <>
                        <IoHeartOutline />
                        <span>Adicionar aos favoritos</span>
                      </>
                    )}
                  </button>
                  <button
                    title='Compartilhar produto'
                    className='share-button'
                    onClick={() =>
                      state.auth?.id
                        ? shareProductController()
                        : loginPromptController()
                    }>
                    <IoShareSocial />
                    <span>Compartilhar</span>
                  </button>
                </div>

                <div className='cart-container'>
                  <div className='cart-quantity'>
                    <h3>
                      <span>Quantidade de Produtos *</span>
                      <i>(não aplicável a serviços)</i>
                    </h3>
                    <div className='cart-manage'>
                      <button>
                        <IoAdd />
                      </button>
                      <input
                        type='number'
                        title='Quantidade'
                        min={1}
                        aria-label='Quantidade'
                        value={1}
                        onChange={(e) => {}}
                      />
                      <button>
                        <IoRemove />
                      </button>
                    </div>
                  </div>
                  <div className='cart-actions'>
                    <button className='buy_button'>
                      <IoCartOutline />
                      <span>Comprar agora</span>
                    </button>
                    <button
                      className='add-to-cart_button'
                      onClick={() =>
                        dispatch({
                          type: actions.PRODUCTS_CART,
                          payload: {
                            ...state,
                            cart: [],
                          },
                        })
                      }>
                      <IoAdd />
                      <span>Adicionar ao carrinho</span>
                    </button>
                  </div>
                </div>

                <div className='qr-code-container'>
                  <div className='description'>
                    <h3>
                      <span>Código do Produto</span>
                      <i>(Endereço da página)</i>
                    </h3>
                  </div>
                  <QRCode
                    size={10}
                    style={{
                      height: 'auto',
                      maxWidth: '100px',
                      width: '100%',
                      padding: 8,
                      borderRadius: '8px',
                      background: '#fff',
                      border: `3px solid rgba(${theme.primary}, 0.9)`,
                    }}
                    value={complements.websiteUrl.concat(
                      `/ecommerce/products/${product._id}`
                    )}
                  />
                </div>
              </section>
            </section>
          </aside>

          <article>
            <div className='data-section'>
              <div className='description'>
                <h3>
                  <IoEllipsisHorizontal />
                  <span>Descrição do Produto</span>
                </h3>
              </div>
              <section className='content-container'>
                {state.publicProduct.description.includes('\n') ? (
                  state.publicProduct.description
                    .split('\n')
                    .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                ) : (
                  <p>{state.publicProduct.description}</p>
                )}
              </section>
            </div>

            {state.publicProduct.specifications && (
              <div className='data-section'>
                <div className='description'>
                  <h3>
                    <IoEllipsisHorizontal />
                    <span>Especificações do Produto</span>
                  </h3>
                </div>
                <section className='content-container'>
                  {state.publicProduct.specifications.includes('\n') ? (
                    state.publicProduct.specifications
                      .split('\n')
                      .map((phrase, index) => (
                        <p key={String(index)}>{phrase}</p>
                      ))
                  ) : (
                    <p>{state.publicProduct.specifications}</p>
                  )}
                </section>
              </div>
            )}

            <section className='store-container'>
              <h2>
                <IoStorefront />
                <span>Loja proprietária</span>
              </h2>
              <div className='contents-container'>
                <section>
                  <div className=''>
                    <p className='name'>{state.publicProduct.store.name}</p>
                    <p className='category'>
                      Oferece serviços/produtos relacionados a{' '}
                      <i>{state.publicProduct.store.category}</i>.
                    </p>
                  </div>

                  <div className='location'>
                    <p>
                      Localizada em{' '}
                      <span>{state.publicProduct.store.location.country}</span>{' '}
                      - <span>{state.publicProduct.store.location.state}</span>,{' '}
                      <span>{state.publicProduct.store.location.adress}</span>
                    </p>
                  </div>
                </section>
                <Link
                  href={`/ecommerce/stores/${state.publicProduct.store._id}`}>
                  <IoPaperPlane />
                  <span>Visitar loja</span>
                </Link>
              </div>
            </section>

            {state.publicProduct.allow_comments ? (
              <Comments contentId={state.publicProduct._id} />
            ) : (
              <div className='no-comments-message'>
                <h3>
                  <IoEyeOff />
                  <span>Comentários</span>
                </h3>
                <p>A loja desativou os comentários para este produto.</p>
              </div>
            )}

            <NewsLetter />
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<{
  paths: any;
  fallback: boolean;
}> {
  const productIdList = await fetch({
    method: 'get',
    url: '/api/v1/users/products/public',
  }).then((res) =>
    res.data.map((item: any) => ({ params: { productId: item._id } }))
  );
  return { paths: productIdList, fallback: false };
}

export async function getStaticProps({ params: { productId } }: any) {
  try {
    const { data } = await fetch<Product>({
      method: 'get',
      url: `/api/v1/users/products/public/${productId}`,
    });
    return { props: { product: { ...data } }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
