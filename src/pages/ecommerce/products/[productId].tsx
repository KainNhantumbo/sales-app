import {
  IoAdd,
  IoAlertCircle,
  IoBagHandle,
  IoBan,
  IoCartOutline,
  IoCheckmark,
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
import Link from 'next/link';
import QRCode from 'react-qr-code';
import { motion } from 'framer-motion';
import { actions } from '@/data/actions';
import Layout from '@/components/Layout';
import fetch from '../../../config/client';
import ErrorPage from '@/pages/error-page';
import { formatDate } from '@/lib/time-fns';
import { useEffect, useState } from 'react';
import { Product } from '../../../../@types';
import { useTheme } from 'styled-components';
import { complements } from '@/data/app-data';
import NewsLetter from '@/components/Newsletter';
import ReactImageGallery from 'react-image-gallery';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import 'react-image-gallery/styles/css/image-gallery.css';
import RequestLogin from '@/components/modals/RequestLogin';
import ShareProducts from '@/components/modals/ShareProductModal';
import Comments from '@/components/comments/Comments';
import { EcommerceProductContainer as Container } from '@/styles/common/ecommerce-product';

export default function Product({ product }: any): JSX.Element {
  const {
    state,
    dispatch,
    fetchAPI,
    loginPromptController,
    shareProductController,
    addProductToCart,
    removeProductFromCart,
    updateCartProduct,
    getCartProduct,
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
                  lazyLoad={true}
                  useBrowserFullscreen={true}
                  additionalClass='navigator'
                  autoPlay={false}
                  showPlayButton={false}
                  thumbnailPosition={innerWidth > 445 ? 'left' : 'bottom'}
                  items={Object.values(state.publicProduct.images).map(
                    (image) => ({
                      thumbnail: image.url,
                      original: image.url,
                    })
                  )}
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
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          state.cart.some(
                            (product) =>
                              product.productId === state.publicProduct._id
                          )
                            ? updateCartProduct({
                                productId: state.publicProduct._id,
                                quantity:
                                  getCartProduct(state.publicProduct._id)
                                    .quantity > 1
                                    ? getCartProduct(state.publicProduct._id)
                                        .quantity - 1
                                    : 1,
                              })
                            : addProductToCart({
                                productId: state.publicProduct._id,
                                productName: state.publicProduct.name,
                                quantity: 1,
                                price: state.publicProduct.promotion.status
                                  ? state.publicProduct.price -
                                    (state.publicProduct.price *
                                      state.publicProduct.promotion
                                        .percentage) /
                                      100
                                  : state.publicProduct.price,
                                previewImage: state.publicProduct.images
                                  ? {
                                      id: Object.values(
                                        state.publicProduct.images
                                      )[0]?.id,
                                      url: Object.values(
                                        state.publicProduct.images
                                      )[0]?.url,
                                    }
                                  : undefined,
                              })
                        }>
                        <IoRemove />
                      </motion.button>
                      <input
                        type='number'
                        title='Quantidade'
                        min={1}
                        aria-label='Quantidade'
                        value={getCartProduct(state.publicProduct._id).quantity}
                        onChange={(e) =>
                          state.cart.some(
                            (product) =>
                              product.productId === state.publicProduct._id
                          )
                            ? updateCartProduct({
                                productId: state.publicProduct._id,
                                quantity: Number(e.target.value),
                              })
                            : addProductToCart({
                                productId: state.publicProduct._id,
                                productName: state.publicProduct.name,
                                quantity: 1,
                                price: state.publicProduct.promotion.status
                                  ? state.publicProduct.price -
                                    (state.publicProduct.price *
                                      state.publicProduct.promotion
                                        .percentage) /
                                      100
                                  : state.publicProduct.price,
                                previewImage: state.publicProduct.images
                                  ? {
                                      id: Object.values(
                                        state.publicProduct.images
                                      )[0]?.id,
                                      url: Object.values(
                                        state.publicProduct.images
                                      )[0]?.url,
                                    }
                                  : undefined,
                              })
                        }
                      />
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          state.cart.some(
                            (product) =>
                              product.productId === state.publicProduct._id
                          )
                            ? updateCartProduct({
                                productId: state.publicProduct._id,
                                quantity:
                                  getCartProduct(state.publicProduct._id)
                                    .quantity + 1,
                              })
                            : addProductToCart({
                                productId: state.publicProduct._id,
                                productName: state.publicProduct.name,
                                quantity: 1,
                                price: state.publicProduct.promotion.status
                                  ? state.publicProduct.price -
                                    (state.publicProduct.price *
                                      state.publicProduct.promotion
                                        .percentage) /
                                      100
                                  : state.publicProduct.price,
                                previewImage: state.publicProduct.images
                                  ? {
                                      id: Object.values(
                                        state.publicProduct.images
                                      )[0]?.id,
                                      url: Object.values(
                                        state.publicProduct.images
                                      )[0]?.url,
                                    }
                                  : undefined,
                              })
                        }>
                        <IoAdd />
                      </motion.button>
                    </div>
                  </div>
                  <div className='cart-actions'>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className='buy_button'>
                      <IoCartOutline />
                      <span>Comprar agora</span>
                    </motion.button>
                    <motion.button
                     whileTap={{ scale: 0.8 }}
                     whileHover={{ scale: 1.05 }}
                      className='add-to-cart_button'
                      onClick={() =>
                        state.cart.some(
                          (product) =>
                            product.productId === state.publicProduct._id
                        )
                          ? removeProductFromCart(state.publicProduct._id)
                          : addProductToCart({
                              productId: state.publicProduct._id,
                              productName: state.publicProduct.name,
                              quantity: 1,
                              price: state.publicProduct.promotion.status
                                ? state.publicProduct.price -
                                  (state.publicProduct.price *
                                    state.publicProduct.promotion.percentage) /
                                    100
                                : state.publicProduct.price,
                              previewImage: state.publicProduct.images
                                ? {
                                    id: Object.values(
                                      state.publicProduct.images
                                    )[0]?.id,
                                    url: Object.values(
                                      state.publicProduct.images
                                    )[0]?.url,
                                  }
                                : undefined,
                            })
                      }>
                      {state.cart.some(
                        (product) =>
                          product.productId === state.publicProduct._id
                      ) ? (
                        <>
                          <IoCheckmark />
                          <span>Adicionado ao carrinho</span>
                        </>
                      ) : (
                        <>
                          <IoAdd />
                          <span>Adicionar ao carrinho</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className='qr-code-container'>
                  <div className='description'>
                    <h3>
                      <span>Código do Produto</span>
                      <i>(Endereço do produto)</i>
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

            <div className='data-section'>
              <div className='description'>
                <h3>
                  <IoEllipsisHorizontal />
                  <span>Dados do Produto</span>
                </h3>
              </div>
              <section className='content-container meta-data'>
                <p>
                  <i>ID do Produto:</i> {state.publicProduct._id}
                </p>
                <div>
                  <h3>
                    <span>
                      <i>Publicado em:</i>{' '}
                      {formatDate(state.publicProduct.createdAt)}
                    </span>
                  </h3>
                  {state.publicProduct.updatedAt !==
                    state.publicProduct.createdAt && (
                    <h3>
                      <span>
                        <i>Última atualização:</i>{' '}
                        {formatDate(state.publicProduct.updatedAt)}
                      </span>
                    </h3>
                  )}
                </div>
              </section>
            </div>

            <div className='data-section'>
              <div className='description'>
                <h3>
                  <IoBan />
                  <span>Denúncia</span>
                </h3>
              </div>
              <section className='content-container denounce'>
                <h3>
                  <span>Notou algo errado com o produto?</span>
                </h3>

                <p>
                  Zelamos pela segurança dos usuários e clientes na plataforma,
                  se notou algo estranho ou suspeito, não exite em fazer uma
                  denúncia, o denunciado não saberá a sua identidade.
                </p>
                <div>
                  <p>
                    As denúncias serão processadas de acordo com o nosso{' '}
                    <Link href={'/legal/code-of-conduct'}>
                      <span>código de conduta</span>
                    </Link>{' '}
                    e os nossos{' '}
                    <Link href={'/legal/terms-of-use'}>
                      <span>termos e condições</span>
                    </Link>
                    .
                  </p>
                  <Link
                    className='denounce-anchor'
                    href={`/denounce?url=${complements.websiteUrl.concat(
                      router.asPath
                    )}&type=product&id=${state.publicProduct._id}`}>
                    <IoAlertCircle />
                    <span>Denunciar Produto</span>
                  </Link>
                </div>
              </section>
            </div>

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
