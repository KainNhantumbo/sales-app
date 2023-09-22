import {
  IoCalendar,
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoLayersOutline,
  IoPricetagsOutline,
  IoReload,
  IoStorefront,
  IoWarningOutline,
} from 'react-icons/io5';
import moment from 'moment';
import Link from 'next/link';
import { useEffect } from 'react';
import Layout from '@/components/Layout';
import actions from '@/shared/actions';
import { ProductsList } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useTheme } from 'styled-components';
import { complements } from '@/shared/data';
import { PulseLoader } from 'react-spinners';
import { VscEmptyWindow } from 'react-icons/vsc';
import ToolBox from '@/components/modals/ToolBox';
import SortBox from '@/components/modals/SortBox';
import { useAppContext } from '@/context/AppContext';
import SearchBox from '@/components/modals/SearchBox';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import ShareProducts from '@/components/modals/ShareProductModal';
import DeleteProductPrompt from '@/components/modals/DeleteProductPrompt';
import { _productList as Container } from '@/styles/common/products';

export default function Products() {
  const {
    state,
    dispatch,
    useFetchAPI,
    shareProductController,
    deleteProductPromptController,
  } = useAppContext();
  const LIMIT: number = 12;
  const theme = useTheme();
  const { ref, inView } = useInView();

  const fetchProducts = async ({ pageParam = 0 }) => {
    const { data } = await useFetchAPI<ProductsList[]>({
      url: `/api/v1/users/products?offset=${
        LIMIT * pageParam
      }&limit=${LIMIT}fields=name,price,quantity,promotion,category,favorites,createdAt,updatedAt&sort=${
        state.productsListQuery.sort || 'updatedAt'
      }&search=${state.productsListQuery.query || ''}`,
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['private-store-products'],
    queryFn: fetchProducts,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
  });

  const handleDeleteProduct = async (productId: string) => {
    try {
      await useFetchAPI({
        method: 'delete',
        url: `/api/v1/users/products/${productId}`,
      });
      deleteProductPromptController(false, '');
      refetch({ queryKey: ['private-store-products'] });
    } catch (err: any) {
      console.error(err?.response?.data?.message || err);
    }
  };

  useEffect(() => {
    if (data) {
      const reducedData = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          productList: [...reducedData],
        },
      });
    }

    return () =>
      dispatch({
        type: actions.PRODUCTS_LIST_DATA,
        payload: { ...state, productList: [] },
      });
  }, [data]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      refetch({ queryKey: ['private-store-products'] });
    }, 500);
    return () => clearTimeout(debounceTimer);
  }, [state.productsListQuery]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    return () =>
      dispatch({
        type: actions.CLEAN_UP_MODALS,
        payload: { ...state },
      });
  }, []);

  return (
    <Layout
      metadata={{ title: `${complements.defaultTitle} | Lista de Produtos` }}>
      <DeleteProductPrompt deleteFn={handleDeleteProduct} />

      <Container>
        <SearchBox />
        <SortBox />
        <ToolBox />

        <article>
          {!isLoading && isError && (
            <section className='error-message'>
              <IoWarningOutline className='icon' />
              <p>
                {(error as any).response?.data?.message ||
                  'Erro ao carregar produtos'}
              </p>
              <button
                onClick={() =>
                  refetch({ queryKey: ['private-store-products'] })
                }>
                <IoReload />
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
                  ref={
                    state.productList.length === index + 1 ? ref : undefined
                  }>
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
                          <IoPricetagsOutline />
                          <span>
                            <i>{formatCurrency(product.price)}</i>{' '}
                            {formatCurrency(
                              product.price -
                                (product.price * product.promotion.percentage) /
                                  100
                            )}
                          </span>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <IoPricetagsOutline />
                          <span> {formatCurrency(product.price)}</span>
                        </div>
                      )}
                      <div className='item'>
                        <IoLayersOutline />
                        <span>{product.category ?? 'Sem categoria'}</span>
                      </div>
                      <div className='item'>
                        <IoHeartOutline />
                        <span>{product.favorites.length} Favoritos</span>
                      </div>
                      <div className='item date'>
                        <IoCalendar />
                        <span>
                          {moment(product.createdAt).format(
                            'MMMM D, yyyy HH:mm'
                          )}
                        </span>
                      </div>
                      <div className='item'>
                        <IoStorefront />
                        <span>{product.quantity} Produtos Estocados</span>
                      </div>
                    </div>
                  </div>
                  <div className='products-list_item_secondary'>
                    <Link
                      href={`/dashboard/product-editor?productId=${product._id}`}
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
                      onClick={() =>
                        deleteProductPromptController(true, product._id)
                      }>
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
                      <IoReload />
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
                        display: 'block',
                      }}
                    />
                  </div>
                )}

                {!hasNextPage &&
                  !isLoading &&
                  !isError &&
                  state.productList.length > 0 && (
                    <p>Sem mais produtos para mostrar</p>
                  )}
              </div>
              {state.productList.length > 0 && (
                <div className='products-list_container__end-mark'>
                  <IoEllipsisHorizontal />
                </div>
              )}
            </div>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
