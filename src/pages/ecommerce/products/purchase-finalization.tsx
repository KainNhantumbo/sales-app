import Link from 'next/link';
import { NextPage } from 'next';
import { TOrder } from '@/../@types';
import Layout from '@/components/Layout';
import { IoArrowBack, IoCart, IoChevronBack, IoReload } from 'react-icons/io5';
import { complements, order_status_labels } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { useQuery } from '@tanstack/react-query';
import { NextRouter, useRouter } from 'next/router';
import { PurchaseFinalizationContainer as Container } from '@/styles/common/purchase-finalization';
import { formatCurrency } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { DefaultTheme, useTheme } from 'styled-components';
import { DotLoader } from 'react-spinners';
import { BsBank2, BsCreditCard2Front } from 'react-icons/bs';

type TOrderSummary = {
  order_code: string;
  order_id: string;
  order_amount: number;
  order_status:
    | 'aknowledged'
    | 'delivered'
    | 'returned'
    | 'cancelled'
    | 'pending-payment';
  user_name: string;
};

const OrderFinalization: NextPage = (): JSX.Element => {
  const { fetchAPI } = useAppContext();
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const [order, setOrder] = useState<TOrderSummary>({
    order_code: '',
    order_id: '',
    order_amount: 0,
    order_status: 'aknowledged',
    user_name: '',
  });

  const getOrder = async () => {
    const { data } = await fetchAPI<TOrder>({
      method: 'get',
      url: `/api/v1/checkout/orders/${router.query['order']}`,
    });

    return {
      order_code: data.order_code,
      order_id: data._id,
      order_amount: data.order_items.reduce(
        (accumulator, item) =>
          (accumulator += item.product_price * Number(item.product_quantity)),

        0
      ),
      order_status: data.order_status,
      user_name: data.order_custumer.user_name,
    };
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['purchase-finalization'],
    queryFn: getOrder,
  });

  useEffect((): (() => void) => {
    if (!isLoading && data) {
      setOrder(data);
    }
    return (): void => {
      setOrder({
        order_code: '',
        order_id: '',
        order_amount: 0,
        order_status: 'aknowledged',
        user_name: '',
      });
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(
          complements.defaultTitle,
          ' | Finalização de Compra'
        ),
      }}>
      <Container>
        {!isLoading && isError && (
          <section className='fetching-state'>
            <h3>
              {(error as any)?.response?.message ||
                'Erro durante o carregamento de dados.'}
            </h3>
            <button onClick={() => router.reload()}>
              <IoReload />
              <span>Recarregar a página</span>
            </button>
            <button onClick={() => router.back()}>
              <IoChevronBack />
              <span>Voltar a página anterior</span>
            </button>
          </section>
        )}

        {isLoading && (
          <section className='fetching-state'>
            <div>
              <DotLoader size={50} color={`rgb(${theme.primary})`} />
              <p>Carregando...</p>
            </div>
          </section>
        )}
        <main>
          <article>
            <section>
              <div className='icon'>
                <IoCart />
              </div>
              <h2 className='title'>Processo de Encomenda</h2>
              <p>Você registou a sua nova encomenda com sucesso.</p>
              <section className='order-summary'>
                <h2>
                  <span>Detalhes da compra</span>
                </h2>

                <div className='data-container'>
                  <p>
                    ID: <i>{order.order_id}</i>
                  </p>
                  <p>
                    Código da Encomenda: <i>{order.order_code}</i>
                  </p>
                  <p>
                    Nome do Proprietário: <i>{order.user_name}</i>
                  </p>
                  <p>
                    Estado do Processo:{' '}
                    <i>
                      {
                        order_status_labels.filter(
                          (status) => status.data === order.order_status
                        )[0].label
                      }
                    </i>
                  </p>
                  <p>Total a pagar: {formatCurrency(order.order_amount)}</p>
                </div>
              </section>

              <Link href={`/auth/sign-in`} className='a-open-mail'>
                <BsCreditCard2Front />
                <span>
                  Pagar <i>{formatCurrency(data?.order_amount ?? 0)}</i>
                </span>
              </Link>
            </section>
          </article>
        </main>
      </Container>
    </Layout>
  );
};

export default OrderFinalization;
