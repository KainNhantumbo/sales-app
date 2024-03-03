import Layout from '@/components/Layout';
import NewsLetter from '@/components/Newsletter';
import Comments from '@/components/comments/Comments';
import ShareProducts from '@/components/modals/ShareProductModal';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { complements } from '@/data/data';
import Categories from '@/data/product-categories.json';
import { formatCurrency, formatDate } from '@/lib/utils';
import ErrorPage from '@/pages/error-page';
import { actions } from '@/shared/actions';
import { _commerceProduct as Container } from '@/styles/common/ecommerce-product';
import { HttpError, Product } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaCartPlus } from 'react-icons/fa';
import {
  IoAdd,
  IoAlertCircle,
  IoBagCheck,
  IoBagHandle,
  IoBan,
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
  IoStorefront
} from 'react-icons/io5';
import { VscVerifiedFilled } from 'react-icons/vsc';
import ReactImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import QRCode from 'react-qr-code';
import { useTheme } from 'styled-components';

export default function Product({ product, error_message }: any) {
  const {
    state,
    dispatch,
    httpClient,
    shareProductController,
    addProductToCart,
    removeProductFromCart,
    updateCartProduct,
    geCartProduct
  } = useAppContext();
  const { requestLogin } = useModulesContext();
  const theme = useTheme();
  const router = useRouter();
  const [innerWidth, setInnerWidth] = useState<number>(0);

  const handleFavoriteProduct = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/products/${id}`
      });
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, favorites: data }
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message ||
          (error as HttpError).message
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
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, favorites: data }
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      );
    }
  };

  const trackInnerWidth = () => setInnerWidth(window.innerWidth);

  useEffect(() => {
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
          publicProduct: { ...state.publicProduct, ...product }
        }
      });
    }
    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: {
            _id: '',
            name: '',
            category: Categories[0],
            description: '',
            specifications: '',
            created_by: '',
            store: {
              _id: '',
              name: '',
              location: {
                country: '',
                state: '',
                address: ''
              },
              category: '',
              verified_store: false
            },
            promotion: { status: false, percentage: 0 },
            price: 0,
            delivery_tax: 0,
            images: undefined,
            createdAt: '',
            updatedAt: '',
            favorites: [],
            allow_comments: true
          }
        }
      });
    };
  }, []);

  if (!product)
    return (
      <ErrorPage
        message={
          error_message || 'Não foi possível carregar os dados do produto'
        }
        retryFn={router.reload}
      />
    );

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | ${product.name}`,
        createdAt: product?.createdAt,
        updatedAt: product?.updatedAt
      }}>
      <Container>
        <ShareProducts
          productId={state.publicProduct._id}
          category={state.publicProduct.category}
          name={state.publicProduct.name}
        />

        <div className='wrapper-container'>
          <aside>
            <div className='images-container'>
              {state.publicProduct.images &&
                Object.values(product.images).length > 0 && (
                  <ReactImageGallery
                    lazyLoad={true}
                    useBrowserFullscreen={true}
                    additionalClass='navigator'
                    autoPlay={false}
                    showPlayButton={false}
                    showThumbnails={
                      innerWidth < 445
                        ? Object.values(state.publicProduct.images).length >= 2
                          ? true
                          : false
                        : true
                    }
                    thumbnailPosition={innerWidth > 445 ? 'left' : 'bottom'}
                    items={Object.values(state.publicProduct.images).map(
                      (image) => ({
                        thumbnail: image.url,
                        original: image.url
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

              {!product.images ||
                (Object.values(product.images).length < 1 && (
                  <IoBagHandle
                    title='Produto sem imagem'
                    className='no-image-icon'
                  />
                ))}
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
                        {formatCurrency(
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
                        {formatCurrency(state.publicProduct.price)}
                      </span>
                    </div>
                  )}
                </div>

                <div className='actions-container'>
                  <button
                    title='Adicionar a lista de favoritos'
                    className='favorite-button'
                    onClick={() => {
                      if (!state.auth?.id) return requestLogin();
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
                      state.auth?.id ? shareProductController() : requestLogin()
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
                                  geCartProduct(state.publicProduct._id)
                                    .quantity > 1
                                    ? geCartProduct(state.publicProduct._id)
                                        .quantity - 1
                                    : 1
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
                                      )[0]?.url
                                    }
                                  : undefined
                              })
                        }>
                        <IoRemove />
                      </motion.button>
                      <input
                        type='number'
                        title='Quantidade'
                        min={1}
                        aria-label='Quantidade'
                        value={geCartProduct(state.publicProduct._id).quantity}
                        onChange={(e) =>
                          state.cart.some(
                            (product) =>
                              product.productId === state.publicProduct._id
                          )
                            ? updateCartProduct({
                                productId: state.publicProduct._id,
                                quantity: Number(e.target.value)
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
                                      )[0]?.url
                                    }
                                  : undefined
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
                                  geCartProduct(state.publicProduct._id)
                                    .quantity + 1
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
                                      )[0]?.url
                                    }
                                  : undefined
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
                      className='buy_button'
                      onClick={() => {
                        if (
                          !state.cart.some(
                            (product) =>
                              product.productId === state.publicProduct._id
                          )
                        ) {
                          addProductToCart({
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
                                  )[0]?.url
                                }
                              : undefined
                          });
                        }
                        if (!state.auth.token) return requestLogin();
                        router.push('/ecommerce/products/purchase');
                      }}>
                      <IoBagCheck />
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
                                    )[0]?.url
                                  }
                                : undefined
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
                          <FaCartPlus />
                          <span>Adicionar ao carrinho</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>

                <div className='qr-code-container'>
                  <div className='description'>
                    <h3>
                      <span>
                        Código QR do Produto <i>(endereço do produto)</i>
                      </span>
                    </h3>

                    {state.publicProduct.store.verified_store ? (
                      <h5>
                        <VscVerifiedFilled />
                        <span>Produto de Loja verificada</span>
                      </h5>
                    ) : (
                      <h5 className='alert'>
                        <IoAlertCircle />
                        <span>Produto de Loja não verificada</span>
                      </h5>
                    )}
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
                      border: `3px solid rgba(${theme.primary}, 0.9)`
                    }}
                    value={`${complements.websiteUrl}/ecommerce/products/${product._id}`}
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
                  <div>
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
                      - <span>{state.publicProduct.store.location.state}</span>
                      <span>
                        {state.publicProduct.store.location.address
                          ? `, ${state.publicProduct.store.location.address}`
                          : '.'}
                      </span>
                    </p>
                  </div>
                </section>
                <Link
                  href={`/community/store/${state.publicProduct.store._id}`}>
                  <IoPaperPlane />
                  <span>Visitar loja</span>
                </Link>
                <h5>
                  {state.publicProduct.store.verified_store ? (
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
            </section>

            {state.publicProduct.allow_comments ? (
              <Comments
                key={state.publicProduct._id}
                contentId={state.publicProduct._id}
              />
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

export async function getStaticPaths() {
  const productIdList = await fetch({
    method: 'get',
    url: '/api/v1/users/products/public'
  }).then((res) =>
    res.data.map((item: any) => ({ params: { productId: item._id } }))
  );
  return { paths: productIdList, fallback: false };
}

export async function getStaticProps({ params: { productId } }: any) {
  try {
    const { data } = await fetch<Product>({
      method: 'get',
      url: `/api/v1/users/products/public/${productId}`
    });
    return { props: { product: { ...data } }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error_message:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message
      },
      revalidate: 10
    };
  }
}
