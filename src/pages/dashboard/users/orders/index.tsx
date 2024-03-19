import Layout from '@/components/layout';
import { SelectContainer } from '@/components/select';
import { SideBarAds } from '@/components/sidebar-ads';
import { useAppContext } from '@/context/AppContext';
import {
  constants,
  orderSortOptions,
  orderStatusOptions,
  order_status_labels
} from '@/data/constants';
import { useUserOrdersQuery } from '@/hooks/use-orders-query';
import { formatDate } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _myOrders as Container } from '@/styles/common/my-orders';
import type { HttpError } from '@/types';
import { BsBox2, BsBox2Fill } from 'react-icons/bs';
import { IoClose, IoEllipsisHorizontal, IoReload, IoSearch } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();

  const {
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    inViewRef,
    deleteOrder,
    updateOrder
  } = useUserOrdersQuery();

  const isAnFilterActive = (): boolean => {
    return Object.values(state.ordersQuery).some((item) => (item !== '' ? true : false));
  };

  const serialiseOrderStatus = (status: string): string => {
    const option = order_status_labels.find(({ value }) => value === status);
    return option?.label ?? '';
  };

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Minhas Encomendas` }}>
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
                        ordersQuery: { ...state.ordersQuery, search: e.target.value }
                      }
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
                        ordersQuery: { ...state.ordersQuery, sort: String(option?.value) }
                      }
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
                          status: String(option?.value)
                        }
                      }
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
                        ordersQuery: { search: '', status: '', sort: '' }
                      }
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
                    ref={state.orders.length === index + 1 ? inViewRef : undefined}
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
                            <span>{order.order_costumer.user_name}</span>
                          </h3>
                        </div>
                      </div>
                      <div className='details-container'>
                        <p>
                          País: <span>{order.order_costumer.user_location.country}</span>
                        </p>
                        <p>
                          Província / Estado:{' '}
                          <span>{order.order_costumer.user_location.state}</span>
                        </p>
                        <p>
                          Código Postal:{' '}
                          <span>{order.order_costumer.user_location.zip_code}</span>
                        </p>
                        <p>
                          Endereço:{' '}
                          <span>{order.order_costumer.user_location.address}</span>
                        </p>
                        {order.order_costumer.user_notes &&
                        order.order_costumer.user_notes.includes('\n') ? (
                          <div className='content'>
                            <h3>
                              <span>Conteúdo</span>
                            </h3>
                            {order.order_costumer.user_notes
                              .split('\n')
                              .map((phrase, index) => (
                                <p key={String(index)}>{phrase}</p>
                              ))}
                          </div>
                        ) : (
                          <>
                            <div className='content'>
                              <h3>
                                <span>Conteúdo</span>
                              </h3>
                              <p>{order.order_costumer.user_notes}</p>
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
                      <button onClick={() => deleteOrder(order._id)}>
                        Eliminar encomenda
                      </button>
                    </section>
                  </div>
                ))}
              </section>
            )}

            <div className='stats-container'>
              {isError && !isLoading && state.orders.length > 0 ? (
                <div className='fetch-error-message'>
                  <h3>
                    {(error as HttpError).response?.data?.message ||
                      'Erro ao carregar os dados'}
                  </h3>
                  <button onClick={() => fetchNextPage()}>
                    <IoReload />
                    <span>Tentar novamente</span>
                  </button>
                </div>
              ) : null}

              {isLoading && !isError ? (
                <div className='loading'>
                  <PulseLoader
                    size={20}
                    color={`rgb(${theme.primary})`}
                    aria-placeholder='Processando...'
                    cssOverride={{
                      display: 'block'
                    }}
                  />
                </div>
              ) : null}

              {!hasNextPage && !isLoading && !isError && state.orders.length > 0 && (
                <p>Sem mais dados para mostrar</p>
              )}
            </div>
            {state.orders.length > 0 ? (
              <div className='container-items__end-mark'>
                <IoEllipsisHorizontal />
              </div>
            ) : null}

            {state.orders.length < 1 && !isLoading ? (
              <div className='empty-data_container'>
                <section className='content'>
                  <BsBox2Fill />
                  <h3>
                    <span>Sem encomendas para mostrar</span>
                    <p>Encomende produtos para começar</p>
                  </h3>
                </section>
              </div>
            ) : null}
          </article>
        </div>
      </Container>
    </Layout>
  );
}