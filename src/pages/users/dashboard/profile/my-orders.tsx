import Layout from '@/components/Layout';
import { NextPage } from 'next';
import { complements, order_status_labels } from '@/data/app-data';
import SideBarAds from '@/components/SidaBarAds';
import { BsBox2, BsBox2Fill } from 'react-icons/bs';
import { DefaultTheme, useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { MyOrdersContainer as Container } from '@/styles/common/my-orders';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TOrder } from '@/../@types';
import { useEffect } from 'react';
import { actions } from '@/data/actions';

const MyOrders: NextPage = (): JSX.Element => {
  const QUERY_LIMIT: number = 10;
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, fetchAPI } = useAppContext();
  const { inView, ref }: InViewHookResponse = useInView();

  const fetchOrders = async ({
    pageParam = 0,
  }): Promise<{ data: TOrder[]; currentOffset: number }> => {
    const { data } = await fetchAPI<TOrder[]>({
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
    isFetching,
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

  const updateOrder = async (id: string, data: any): Promise<void> => {
    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/checkout/orders/${id}`,
        data: { ...data },
      });
      refetch({ queryKey: ['user-orders'] });
    } catch (error: any) {
      console.info(error?.response?.data?.message || error);
    }
  };

  const deleteOrder = async (id: string): Promise<void> => {
    try {
      await fetchAPI({
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

  useEffect((): (() => void) => {
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

    return (): void => {
      dispatch({
        type: actions.ORDERS,
        payload: { ...state, orders: [] },
      });
    };
  }, [data]);

  useEffect((): void => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect((): (() => void) => {
    const debounceTime = setTimeout(() => {
      refetch({ queryKey: ['user-orders'] });
    }, 500);
    return (): void => {
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
};

export default MyOrders;
