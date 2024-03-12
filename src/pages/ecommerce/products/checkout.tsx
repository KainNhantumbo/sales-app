import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { constants, order_status_labels } from '@/data/constants';
import { formatCurrency } from '@/lib/utils';
import { _checkout as Container } from '@/styles/common/checkout';
import type { Order, OrderSummary } from '@/types';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsCreditCard2Front } from 'react-icons/bs';
import { IoCart, IoChevronBack, IoReload } from 'react-icons/io5';
import { DotLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Page() {
  const { httpClient } = useAppContext();
  const theme = useTheme();
  const router = useRouter();
  const [order, seOrder] = useState<OrderSummary>({
    order_code: '',
    order_id: '',
    order_amount: 0,
    order_status: 'pending',
    user_name: ''
  });

  const getOrder = async () => {
    const { data } = await httpClient<Order>({
      method: 'get',
      url: `/api/v1/checkout/orders/${router.query['order']}`
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
      user_name: data.order_costumer.user_name
    };
  };

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['checkout'],
    queryFn: getOrder
  });

  const serialiseOrderStatus = (status: string): string => {
    const option = order_status_labels.find(({ value }) => value === status);
    return option?.label ?? '';
  };

  useEffect(() => {
    if (!isLoading && data) {
      seOrder(data);
    }
    return () => {
      seOrder({
        order_code: '',
        order_id: '',
        order_amount: 0,
        order_status: 'pending',
        user_name: ''
      });
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle}  | Finalização de Compra`
      }}>
      <Container>
        {!isLoading && isError && (
          <section className='fetching-state'>
            <h3>
              {(error as any)?.response?.message || 'Erro durante o carregamento de dados.'}
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
                    Estado do Processo: <i>{serialiseOrderStatus(order.order_status)}</i>
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
}
