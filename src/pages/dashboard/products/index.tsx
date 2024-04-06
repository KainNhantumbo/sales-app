import Layout from '@/components/layout';
import { SearchBox } from '@/components/modals/search-box';
import { ShareProducts } from '@/components/modals/share-product-prompt';
import { SortBox } from '@/components/modals/sort-box';
import { ToolBox } from '@/components/modals/tool-box';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { useProductsQuery } from '@/hooks/use-products-query';
import { errorTransformer } from '@/lib/error-transformer';
import { formatCurrency } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _productList as Container } from '@/styles/common/products';
import { HttpError } from '@/types';
import moment from 'moment';
import Link from 'next/link';
import { useEffect } from 'react';
import * as Io from 'react-icons/io5';
import { VscEmptyWindow } from 'react-icons/vsc';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const { state, dispatch, httpClient, shareProductController } = useAppContext();
  const { error, inViewRef, refetch, isError, isLoading, fetchNextPage, hasNextPage } =
    useProductsQuery();

  const handleDeleteProduct = async (productId: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          ...state.prompt,
          status: true,
          title: 'Eliminar Produto da Loja',
          message:
            'Você realmente gostaria de eliminar permanentemente este produto da sua loja? Esta ação não pode ser desfeita.',
          actionButtonMessage: 'Eliminar',
          handleFunction: async () => {
            try {
              await httpClient({
                method: 'delete',
                url: `/api/v1/users/products/${productId}`
              });
              refetch({ queryKey: ['private-store-products'] });
            } catch (error) {
              const { message } = errorTransformer(error as HttpError);
              toast.error(message);
              console.error(error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
            }
          }
        }
      }
    });
  };

  useEffect(() => {
    return () => dispatch({ type: actions.CLEAN_UP_MODALS, payload: { ...state } });
  }, []);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Lista de Produtos` }}>
      <Container>
        <SearchBox />
        <SortBox />
        <ToolBox />

        <article>
          {!isLoading && isError && (
            <section className='error-message'>
              <Io.IoWarningOutline className='icon' />
              <p>{errorTransformer(error as HttpError).message}</p>
              <button onClick={() => refetch({ queryKey: ['private-store-products'] })}>
                <Io.IoReload />
                <span>Tentar novamente</span>
              </button>
            </section>
          )}

          <section className='main-container'>
            {!isLoading && !isError && state.productList.length < 1 && (
              <div className='empty-data_container'>
                <section className='content'>
                  <div className='icon'>
                    <VscEmptyWindow />
                  </div>
                  <div className='message'>
                    <h3>Nenhum produto para mostrar.</h3>
                  </div>
                </section>
              </div>
            )}
            <div className='products-list_container'>
              {state.productList.map((product, index) => (
                <div
                  key={product._id}
                  className='products-list_item'
                  ref={state.productList.length === index + 1 ? inViewRef : undefined}>
                  {index === 0 && (
                    <ShareProducts
                      productId={product._id}
                      category={product.category}
                      name={product.name}
                    />
                  )}

                  <div className='products-list_item_primary'>
                    <div className='top-side'>
                      <h3 className='name'>
                        <span>{product.name}</span>
                      </h3>
                      <h3 className='id'>
                        <span>ID-{product._id}</span>
                      </h3>
                      {product.promotion.status && (
                        <p className='promotion'>
                          Promoção {product.promotion.percentage}%
                        </p>
                      )}
                    </div>
                    <div className='bottom-side'>
                      {product.promotion.status ? (
                        <div className='item promo-price'>
                          <Io.IoPricetagsOutline />
                          <span>
                            <i>{formatCurrency(product.price)}</i>{' '}
                            {formatCurrency(
                              product.price -
                                (product.price * product.promotion.percentage) / 100
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <Io.IoPricetagsOutline />
                          <span> {formatCurrency(product.price)}</span>
                        </div>
                      )}
                      <div className='item'>
                        <Io.IoLayersOutline />
                        <span>{product.category ?? 'Sem categoria'}</span>
                      </div>
                      <div className='item'>
                        <Io.IoHeartOutline />
                        <span>{product.favorites.length} Favoritos</span>
                      </div>
                      <div className='item date'>
                        <Io.IoCalendar />
                        <span>
                          {moment(product.createdAt).format('MMMM D, yyyy HH:mm')}
                        </span>
                      </div>
                      <div className='item'>
                        <Io.IoStorefront />
                        <span>{product.quantity} Produtos Estocados</span>
                      </div>
                    </div>
                  </div>
                  <div className='products-list_item_secondary'>
                    <Link
                      href={`/dashboard/products/editor?productId=${product._id}`}
                      title='Editar e atualizar informações do produto'>
                      <span>Editar produto</span>
                    </Link>
                    <Link
                      href={`/ecommerce/products/${product._id}`}
                      title='Ver o produto na sua loja'>
                      <span>Ver o produto</span>
                    </Link>
                    <button
                      title='Eliminar produto da sua loja'
                      onClick={() => handleDeleteProduct(product._id)}>
                      <span>Eliminar produto</span>
                    </button>
                    <button
                      title='Compartilhar produto da sua loja'
                      onClick={() => shareProductController()}>
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              ))}

              <div className='stats-container'>
                {isError && !isLoading && state.productList.length > 0 && (
                  <div className=' fetch-error-message '>
                    <h3>Erro ao carregar produtos</h3>
                    <button onClick={() => fetchNextPage()}>
                      <Io.IoReload />
                      <span>Tentar novamente</span>
                    </button>
                  </div>
                )}

                {isLoading && !isError && (
                  <div className='loading'>
                    <PulseLoader
                      size={20}
                      color={`rgb(${theme.primary_shade})`}
                      aria-placeholder='Processando...'
                      cssOverride={{
                        display: 'block'
                      }}
                    />
                  </div>
                )}

                {!hasNextPage && !isLoading && !isError && state.productList.length > 0 && (
                  <p>Sem mais produtos para mostrar</p>
                )}
              </div>
              {state.productList.length > 0 && (
                <div className='products-list_container__end-mark'>
                  <Io.IoEllipsisHorizontal />
                </div>
              )}
            </div>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
