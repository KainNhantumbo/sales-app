import {
  IoCalendar,
  IoDiamondOutline,
  IoEllipsisHorizontal,
  IoHeart,
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
import { ProductsList } from '../../../../../@types';
import { ProductListContainer as Container } from '@/styles/common/products';
import ToolBox from '@/components/modals/ToolBox';
import SearchBox from '@/components/modals/SearchBox';
import SortBox from '@/components/modals/SortBox';
import AppStatus from '@/components/AppStatus';
import { formatDate } from '@/lib/time-fns';
import moment from 'moment';

export default function Products(): JSX.Element {
  const { state, dispatch, fetchAPI } = useAppContext();
  const theme = useTheme();
  const router: NextRouter = useRouter();
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
        url: `/api/v1/users/products?fields=name,price,quantity,promotion,favorites,createdAt,updatedAt${
          `&sort=${state.productsListQuery.sort}` ?? ''
        }${`&search=${state.productsListQuery.query}` ?? ''}`
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
    <Layout metadata={{ title: 'Lista de Produtos' }}>
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
                      <div>
                        <IoPricetagsOutline />
                        <span>MZN {product.price}</span>
                      </div>
                      <div>
                        <IoLayersOutline />
                        <span>{product.category ?? 'Sem categoria'}</span>
                      </div>
                      <div>
                        <IoHeartOutline />
                        <span>{product.favorites.length} Favoritos</span>
                      </div>
                      <div className='date'>
                        <IoCalendar />
                        <span>
                          {moment(product.createdAt).format('MMMM D, yyyy')}
                        </span>
                      </div>
                      <div>
                        <IoStorefront />
                        <span>{product.quantity} Produtos Estocados</span>
                      </div>
                    </div>
                  </div>
                  <div className='products-list_item_secondary'>
                    <button
                      onClick={() =>
                        router.push(
                          `/users/dashboard/${state.userAuth.id}/product-editor/${product._id}}`
                        )
                      }>
                      <span>Editar produto</span>
                    </button>
                    <button onClick={() => {}}>
                      <span>Eliminar produto</span>
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
