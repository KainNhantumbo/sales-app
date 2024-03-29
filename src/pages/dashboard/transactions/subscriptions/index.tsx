import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import { constants } from '@/data/constants';
import { useSubscriptionsQuery } from '@/hooks/use-subscriptions-query';
import { _subsTransactions as Container } from '@/styles/common/transactions-subscriptions';
import { IoCardOutline } from 'react-icons/io5';

export default function Page() {
  const { isError, isLoading, subscription } = useSubscriptionsQuery();

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Pagamento de Subscrições` }}>
      <Container>
        <SideBarAds key={'subscriptions'} />
        <article>
          <section className='header-container'>
            <h2>
              <IoCardOutline />
              <span>Subscrições</span>
            </h2>
            <p>Sua Subscrição Ativa</p>
          </section>

          <section>
            <h3>{subscription?.model}</h3>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
