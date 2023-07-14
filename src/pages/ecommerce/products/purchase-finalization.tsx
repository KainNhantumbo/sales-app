import Link from 'next/link';
import { NextPage } from 'next';
import { TOrder } from '@/../@types';
import Layout from '@/components/Layout';
import { IoCart } from 'react-icons/io5';
import { complements } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { useQuery } from '@tanstack/react-query';
import { NextRouter, useRouter } from 'next/router';
import { PurchaseFinalizationContainer as Container } from '@/styles/common/purchase-finalization';

const OrderFinalization: NextPage = (): JSX.Element => {
  const { fetchAPI } = useAppContext();
  const router: NextRouter = useRouter();

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

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ['purchase-finalization'],
    queryFn: getOrder,
  });

  return (
    <Layout
      metadata={{
        title: String.prototype.concat(
          complements.defaultTitle,
          ' | Finalização de Compra'
        ),
      }}>
      <Container>
        <article>
          <section>
            <div>
              <IoCart />
            </div>
            <h2>Conta de usuário criada</h2>
            <p>
              Você criou a sua nova conta de usuário com sucesso, clique em
              "acessar conta criada" para continuar.
            </p>

            <Link href={`/auth/sign-in`} className='a-open-mail'>
              <span>Acessar conta criada</span>
            </Link>
            <Link href={`/`} className='a-back'>
              <span>Pular, vou acessar mais tarde.</span>
            </Link>
          </section>
        </article>
      </Container>
    </Layout>
  );
};

export default OrderFinalization;
