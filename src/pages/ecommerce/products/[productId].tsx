import { Comments } from '@/components/comments/comments';
import Layout from '@/components/layout';
import { ShareProducts } from '@/components/modals/share-product-prompt';
import { NewsLetter } from '@/components/newsletter';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { constants } from '@/data/constants';
import { useCartStore } from '@/hooks/use-cart-store';
import { useInnerWindowSize } from '@/hooks/use-window-size';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState } from '@/lib/reducer';
import { formatCurrency, formatDate } from '@/lib/utils';
import ErrorPage from '@/pages/error-page';
import { actions } from '@/shared/actions';
import { _commerceProduct as Container } from '@/styles/common/ecommerce-product';
import type { HttpError, PublicProduct } from '@/types';
import { motion } from 'framer-motion';
import type { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
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

type Props = { product?: PublicProduct; error_message?: string };

export default function Page({ product, error_message }: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { requestLogin } = useModulesContext();
  const { width: innerWindowWidth } = useInnerWindowSize();
  const { state, dispatch, httpClient, shareProductController } = useAppContext();
  const { removeProductFromCart, addProductToCart, getCartProduct, updateCartProduct } =
    useCartStore();

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
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: {
          ...state,
          publicProduct: { ...state.publicProduct, favorites: data }
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  useEffect(() => {
    if (product) {
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: { ...state, publicProduct: { ...state.publicProduct, ...product } }
      });
    }
    return () => {
      dispatch({
        type: actions.PUBLIC_PRODUCT_DATA,
        payload: { ...state, publicProduct: initialState.publicProduct }
      });
    };
  }, []);

  if (!product)
    return (
      <ErrorPage
        message={error_message || 'Não foi possível carregar os dados do produto'}
        retryFn={router.reload}
      />
    );

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | ${product.name}`,
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
              {product.images.length > 0 && (
                <ReactImageGallery
                  lazyLoad={true}
                  useBrowserFullscreen={true}
                  additionalClass='navigator'
                  autoPlay={false}
                  showPlayButton={false}
                  showThumbnails={
                    innerWindowWidth < 445
                      ? product.images.length >= 2
                        ? true
                        : false
                      : true
                  }
                  thumbnailPosition={innerWindowWidth > 445 ? 'left' : 'bottom'}
                  items={product.images.map((image) => ({
                    thumbnail: image.url,
                    original: image.url
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
                  renderFullscreenButton={(onClick, isFullScreen) => (
                    <button className='nav-fullscreen' onClick={onClick}>
                      {isFullScreen ? <IoContract /> : <IoScan />}
                    </button>
                  )}
                />
              )}

              {!product.images ||
                (product.images?.length < 1 ? (
                  <IoBagHandle title='Produto sem imagem' className='no-image-icon' />
                ) : null)}
            </div>

            <section className='product-container'>
              <div className='product-name'>
                <h1>
                  <span>{product.name}</span>
                </h1>
                <p>
                  Categorizado em <i>{product.category}</i>.
                </p>
              </div>

              <section className='front-container'>
                <div className='product-details'>
                  {product.promotion.status ? (
                    <div className='price-container'>
                      <p className='promo-alert'>
                        <IoFlame />
                        <span>PROMO</span>
                      </p>{' '}
                      <span className='actual-price'>
                        {formatCurrency(
                          product.price -
                            (product.price * product.promotion.percentage) / 100
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
                      if (product.favorites.includes(state.auth?.id))
                        return handleUnFavoriteProduct(product._id);
                      return handleFavoriteProduct(product._id);
                    }}>
                    {product.favorites.includes(state.auth.id) ? (
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
                          state.cart.some((item) => item.productId === product._id)
                            ? updateCartProduct({
                                productId: product._id,
                                quantity:
                                  getCartProduct(product._id).quantity > 1
                                    ? getCartProduct(product._id).quantity - 1
                                    : 1
                              })
                            : addProductToCart({
                                productId: product._id,
                                productName: product.name,
                                quantity: 1,
                                price: product.promotion.status
                                  ? product.price -
                                    (product.price * product.promotion.percentage) / 100
                                  : product.price,
                                previewImage: product.images
                                  ? {
                                      id: product.images[0]?.id,
                                      url: product.images[0]?.url
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
                        value={getCartProduct(product._id).quantity}
                        onChange={(e) =>
                          state.cart.some((item) => item.productId === product._id)
                            ? updateCartProduct({
                                productId: product._id,
                                quantity: +e.target.value
                              })
                            : addProductToCart({
                                productId: product._id,
                                productName: product.name,
                                quantity: 1,
                                price: product.promotion.status
                                  ? product.price -
                                    (product.price * product.promotion.percentage) / 100
                                  : product.price,
                                previewImage: product.images
                                  ? {
                                      id: product.images[0]?.id,
                                      url: product.images[0]?.url
                                    }
                                  : undefined
                              })
                        }
                      />
                      <motion.button
                        whileTap={{ scale: 0.8 }}
                        whileHover={{ scale: 1.05 }}
                        onClick={() =>
                          state.cart.some((item) => item.productId === product._id)
                            ? updateCartProduct({
                                productId: product._id,
                                quantity: getCartProduct(product._id).quantity + 1
                              })
                            : addProductToCart({
                                productId: product._id,
                                productName: product.name,
                                quantity: 1,
                                price: product.promotion.status
                                  ? product.price -
                                    (product.price * product.promotion.percentage) / 100
                                  : state.publicProduct.price,
                                previewImage: state.publicProduct.images
                                  ? {
                                      id: state.publicProduct.images[0]?.id,
                                      url: state.publicProduct.images[0]?.url
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
                            (product) => product.productId === state.publicProduct._id
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
                                  id: state.publicProduct.images[0]?.id,
                                  url: state.publicProduct.images[0]?.url
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
                          (product) => product.productId === state.publicProduct._id
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
                                    id: state.publicProduct.images[0]?.id,
                                    url: state.publicProduct.images[0]?.url
                                  }
                                : undefined
                            })
                      }>
                      {state.cart.some(
                        (product) => product.productId === state.publicProduct._id
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
                    value={`${constants.websiteUrl}/ecommerce/products/${product._id}`}
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
                {product.description.includes('\n') ? (
                  product.description
                    .split('\n')
                    .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                ) : (
                  <p>{product.description}</p>
                )}
              </section>
            </div>

            {product.specifications && (
              <div className='data-section'>
                <div className='description'>
                  <h3>
                    <IoEllipsisHorizontal />
                    <span>Especificações do Produto</span>
                  </h3>
                </div>
                <section className='content-container'>
                  {product.specifications.includes('\n') ? (
                    product.specifications
                      .split('\n')
                      .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
                  ) : (
                    <p>{product.specifications}</p>
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
                  <i>ID do Produto:</i> {product._id}
                </p>
                <div>
                  <h3>
                    <span>
                      <i>Publicado em:</i> {formatDate(product.createdAt)}
                    </span>
                  </h3>
                  {product.updatedAt !== product.createdAt && (
                    <h3>
                      <span>
                        <i>Última atualização:</i> {formatDate(product.updatedAt)}
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
                  Zelamos pela segurança dos usuários e clientes na plataforma, se notou
                  algo estranho ou suspeito, não exite em fazer uma denúncia, o denunciado
                  não saberá a sua identidade.
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
                    href={`/denounce?url=${constants.websiteUrl.concat(
                      router.asPath
                    )}&type=product&id=${product._id}`}>
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
                    <p className='name'>{product.store.name}</p>
                    <p className='category'>
                      Oferece serviços/produtos relacionados a{' '}
                      <i>{product.store.category}</i>.
                    </p>
                  </div>

                  <div className='location'>
                    <p>
                      Localizada em <span>{product.store.location.country}</span> -{' '}
                      <span>{product.store.location.state}</span>
                      <span>
                        {product.store.location.address
                          ? `, ${product.store.location.address}`
                          : '.'}
                      </span>
                    </p>
                  </div>
                </section>
                <Link href={`/community/store/${product.store._id}`}>
                  <IoPaperPlane />
                  <span>Visitar loja</span>
                </Link>
                <h5>
                  {product.store.verified_store ? (
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

            {product.allow_comments ? (
              <Comments key={product._id} contentId={product._id} />
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
  }).then((res) => res.data.map((item: any) => ({ params: { productId: item._id } })));
  return { paths: productIdList, fallback: false };
}

export async function getStaticProps<
  T extends GetStaticPropsContext<{ productId?: string }>
>(props: T) {
  try {
    const { data } = await fetch<PublicProduct>({
      method: 'get',
      url: `/api/v1/users/products/public/${props.params?.productId}`
    });
    return { props: { product: { ...data } }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return {
      props: {
        error_message: errorTransformer(error as HttpError)
      },
      revalidate: 10
    };
  }
}
