import {
  IoCalendar,
  IoEllipsisHorizontal,
  IoHeartOutline,
  IoLayersOutline,
  IoPricetagsOutline,
  IoStorefront,
  IoWarningOutline
} from 'react-icons/io5';
import { VscEmptyWindow } from 'react-icons/vsc';
import Link from 'next/link';
import { AxiosResponse } from 'axios';
import Layout from '@/components/Layout';
import { DotLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { actions } from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'styled-components';
import { ProductsList } from '../../../../@types';
import { ProductListContainer as Container } from '@/styles/common/products';
import ToolBox from '@/components/modals/ToolBox';
import SearchBox from '@/components/modals/SearchBox';
import SortBox from '@/components/modals/SortBox';
import AppStatus from '@/components/AppStatus';
import { formatDate } from '@/lib/time-fns';
import moment from 'moment';
import DeleteProductPrompt from '@/components/modals/DeleteProductPrompt';
import { complements } from '@/data/app-data';

export default function Products(): JSX.Element {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI, deleteProductPromptController } =
    useAppContext();
  const [loading, setLoading] = useState<{ status: boolean }>({
    status: false
  });
  const [error, setError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: ''
  });

  async function fetchProducts(): Promise<void> {
    setError({ status: false, msg: '' });
    setLoading({ status: true });
    try {
      const { data }: AxiosResponse<ProductsList[]> = await fetchAPI({
        url: `/api/v1/users/products?fields=name,price,quantity,promotion,category,favorites,createdAt,updatedAt${`&sort=${
          state.productsListQuery.sort || 'updatedAt'
        }`}${`&search=${state.productsListQuery.query || ''}`}`
      });
      dispatch({
        type: actions.PRODUCTS_LIST_DATA,
        payload: {
          ...state,
          productList: data
        }
      });
      if (data?.length === 0)
        setError({ status: true, msg: 'Nada para mostrar.' });
    } catch (e: any) {
      console.error(e);
      setError({
        status: true,
        msg: 'Um erro ocorreu durante o processamento da sua requisição. Por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false });
    }
  }

  async function handleDeleteProduct(productId: string) {
    try {
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/products/${productId}`
      });
      deleteProductPromptController(false, '');
      fetchProducts();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  useEffect(() => {
    fetchProducts();
    return () => {};
  }, [state.productsListQuery]);

  useEffect(() => {
    return () => {
      setLoading({ status: false });
      dispatch({ type: actions.CLEAN_UP_MODALS });
    };
  }, []);

  return (
    <Layout
      metadata={{ title: `${complements.defaultTitle} | Lista de Produtos` }}>
      <DeleteProductPrompt deleteFn={handleDeleteProduct} />
      <Container>
        {loading.status && !error.status && (
          <section className='fetching-state'>
            <div className='center'>
              <DotLoader size={60} color={`rgb(${theme.primary})`} />
              <span>Carregando...</span>
            </div>
          </section>
        )}

        <SearchBox />
        <SortBox />

        <ToolBox />
        <AppStatus />
        <article>
          {!loading.status && error.status && (
            <section className='error-message'>
              <IoWarningOutline />
              <p>{error.msg}</p>
            </section>
          )}

          <section className='main-container'>
            {state.productList.length < 1 && (
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
              {state.productList.map((product) => (
                <div key={product._id} className='products-list_item'>
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
                            MZN <i>{product.price}</i>{' '}
                            {(
                              product.price -
                              (product.price * product.promotion.percentage) /
                                100
                            ).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <div className='item promo-price'>
                          <IoPricetagsOutline />
                          <span>MZN {product.price}</span>
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
                      href={`/users/dashboard/product-editor/${product._id}`}
                      title='Editar e atualizar informações do produto'>
                      <span>Editar produto</span>
                    </Link>
                    <Link
                      href={`/users/stores/products/${product._id}`}
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
                      onClick={() =>
                        deleteProductPromptController(true, product._id)
                      }>
                      <span>Compartilhar</span>
                    </button>
                  </div>
                </div>
              ))}
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
