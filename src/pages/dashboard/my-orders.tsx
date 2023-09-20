import {
  IoClose,
  IoEllipsisHorizontal,
  IoReload,
  IoSearch,
} from 'react-icons/io5';
import {
  complements,
  orderSortOptions,
  orderStatusOptions,
  order_status_labels,
} from '@/shared/data';
import { useEffect } from 'react';
import { TOrder } from '@/types';
import { formatDate } from '@/lib/utils';
import actions from '@/shared/actions';
import Layout from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import SideBarAds from '@/components/SidaBarAds';
import SelectContainer from '@/components/Select';
import { BsBox2, BsBox2Fill } from 'react-icons/bs';
import { useAppContext } from '@/context/AppContext';
import { useInfiniteQuery } from '@tanstack/react-query';
import { _myOrders as Container } from '@/styles/common/my-orders';
import { useTheme } from 'styled-components';
import { useInView } from 'react-intersection-observer';

export default function MyOrders() {
  const QUERY_LIMIT: number = 10;
  const theme = useTheme();
  const { state, dispatch, useFetchAPI } = useAppContext();
  const { inView, ref } = useInView();

  const fetchOrders = async ({
    pageParam = 0,
  }): Promise<{ data: TOrder[]; currentOffset: number }> => {
    const { data } = await useFetchAPI<TOrder[]>({
      method: 'get',
      url: `/api/v1/checkout/orders?offset=${
        pageParam * QUERY_LIMIT
      }&limit=${QUERY_LIMIT}${
        state.ordersQuery.search && `&search=${state.ordersQuery.search}`
      }${state.ordersQuery.status && `&status=${state.ordersQuery.status}`}${
        state.ordersQuery.sort && `&sort=${state.ordersQuery.sort}`
      }`,
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const {
    data,
    error,
    refetch,
    isError,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['user-orders'],
    queryFn: fetchOrders,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= QUERY_LIMIT
        ? lastPage.currentOffset
        : undefined,
  });

  const updateOrder = async (id: string, data: any) => {
    try {
      await useFetchAPI({
        method: 'patch',
        url: `/api/v1/checkout/orders/${id}`,
        data: { ...data },
      });
      refetch({ queryKey: ['user-orders'] });
    } catch (error: any) {
      console.info(error?.response?.data?.message || error);
    }
  };

  const deleteOrder = async (id: string) => {
    try {
      await useFetchAPI({
        method: 'delete',
        url: `/api/v1/checkout/orders/${id}`,
      });
      refetch({ queryKey: ['user-orders'] });
    } catch (error: any) {
      console.info(error?.response?.data?.message || error);
    }
  };

  const isAnFilterActive = (): boolean => {
    return Object.values(state.ordersQuery).some((item) =>
      item !== '' ? true : false
    );
  };

  const serialiseOrderStatus = (status: string): string => {
    const option = order_status_labels.find(({ value }) => value === status);
    return option?.label ?? '';
  };

  useEffect(() => {
    if (data) {
      const formattedData = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.ORDERS,
        payload: {
          ...state,
          orders: [...formattedData],
        },
      });
    }

    return () => {
      dispatch({
        type: actions.ORDERS,
        payload: { ...state, orders: [] },
      });
    };
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      refetch({ queryKey: ['user-orders'] });
    }, 500);
    return () => {
      clearTimeout(debounceTime);
    };
  }, [state.ordersQuery]);

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(
          complements.defaultTitle,
          ' | Minhas Encomendas'
        ),
      }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'favorite-products'} />
          <article>
            <section className='header-container'>
              <h2>
                <BsBox2 />
                <span>Suas encomendas</span>
              </h2>
              <p>
                Aparecerão aqui os produtos que for encomendar e com o estado de
                processamento dos mesmos.
              </p>
            </section>
            <section className='query-container'>
              <div className='search'>
                <input
                  type='search'
                  placeholder='Pesquisar por código...'
                  value={state.ordersQuery.search}
                  onChange={(e) =>
                    dispatch({
                      type: actions.QUERY_ORDERS,
                      payload: {
                        ...state,
                        ordersQuery: {
                          ...state.ordersQuery,
                          search: e.target.value,
                        },
                      },
                    })
                  }
                />
                <IoSearch />
              </div>
              <div className='seletor'>
                <SelectContainer
                  placeholder='Ordenar por ...'
                  options={orderSortOptions}
                  onChange={(option: any) =>
                    dispatch({
                      type: actions.QUERY_ORDERS,
                      payload: {
                        ...state,
                        ordersQuery: {
                          ...state.ordersQuery,
                          sort: String(option?.value),
                        },
                      },
                    })
                  }
                />
              </div>
              <div className='seletor'>
                <SelectContainer
                  placeholder='Exibir por estado'
                  options={orderStatusOptions}
                  onChange={(option: any) =>
                    dispatch({
                      type: actions.QUERY_ORDERS,
                      payload: {
                        ...state,
                        ordersQuery: {
                          ...state.ordersQuery,
                          status: String(option?.value),
                        },
                      },
                    })
                  }
                />
              </div>

              {isAnFilterActive() && (
                <button
                  className='clear-filters'
                  onClick={() =>
                    dispatch({
                      type: actions.QUERY_ORDERS,
                      payload: {
                        ...state,
                        ordersQuery: {
                          search: '',
                          status: '',
                          sort: '',
                        },
                      },
                    })
                  }>
                  <IoClose />
                  <span>Limpar filtros</span>
                </button>
              )}
            </section>

            {!isLoading && !isError && state.orders.length > 0 && (
              <section className='main-container'>
                {state.orders.map((order, index) => (
                  <div
                    key={order._id}
                    ref={state.orders.length === index + 1 ? ref : undefined}
                    className='order-container'>
                    <section className='top-container'>
                      <div className='header'>
                        <h2>
                          <span>Encomenda</span>
                        </h2>
                        <p>{serialiseOrderStatus(order.order_status)}</p>
                        <h3>ID-#{order._id}</h3>
                      </div>
                      <div className='identity-container'>
                        <h3>
                          <span>Dados do Cliente</span>
                        </h3>
                        <div>
                          <h3 className='author-name'>
                            <span>{order.order_custumer.user_name}</span>
                          </h3>
                        </div>
                      </div>
                      <div className='details-container'>
                        <p>
                          País:{' '}
                          <span>
                            {order.order_custumer.user_location.country}
                          </span>
                        </p>
                        <p>
                          Província / Estado:{' '}
                          <span>
                            {order.order_custumer.user_location.state}
                          </span>
                        </p>
                        <p>
                          Código Postal:{' '}
                          <span>
                            {order.order_custumer.user_location.zip_code}
                          </span>
                        </p>
                        <p>
                          Endereço:{' '}
                          <span>
                            {order.order_custumer.user_location.adress}
                          </span>
                        </p>
                        {order.order_custumer.user_notes &&
                        order.order_custumer.user_notes.includes('\n') ? (
                          <div className='content'>
                            <h3>
                              <span>Conteúdo</span>
                            </h3>
                            {order.order_custumer.user_notes
                              .split('\n')
                              .map((pharase, index) => (
                                <p key={String(index)}>{pharase}</p>
                              ))}
                          </div>
                        ) : (
                          <>
                            <div className='content'>
                              <h3>
                                <span>Conteúdo</span>
                              </h3>
                              <p>{order.order_custumer.user_notes}</p>
                            </div>
                          </>
                        )}

                        <div className='time-stamps'>
                          <p>Criada: {formatDate(order.createdAt)}</p>
                          <p>Atualizada: {formatDate(order.updatedAt)}</p>
                        </div>
                      </div>
                    </section>
                    <section className='base-container'>
                      <button onClick={() => {}}></button>
                      <button onClick={() => deleteOrder(order._id)}>
                        Eliminar encomenda
                      </button>
                    </section>
                  </div>
                ))}
              </section>
            )}

            <div className='stats-container'>
              {isError && !isLoading && state.orders.length > 0 && (
                <div className=' fetch-error-message '>
                  <h3>
                    {(error as any)?.response?.data?.message ||
                      'Erro ao carregar os dados'}
                  </h3>
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
                    color={`rgb(${theme.primary})`}
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
                state.orders.length > 0 && <p>Sem mais dados para mostrar</p>}
            </div>
            {state.orders.length > 0 && (
              <div className='container-items__end-mark'>
                <IoEllipsisHorizontal />
              </div>
            )}

            {state.orders.length < 1 && (
              <div className='empty-data_container'>
                <section className='content'>
                  <BsBox2Fill />
                  <h3>
                    <span>Sem encomendas para mostrar</span>
                    <p>Encomende produtos para começar</p>
                  </h3>
                </section>
              </div>
            )}
          </article>
        </div>
      </Container>
    </Layout>
  );
}
