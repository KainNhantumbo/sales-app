import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _subsTransactions as Container } from '@/styles/common/transactions-subscriptions';

export default function Page() {
  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Pagamento de Subscrições` }}>
      <Container>
      <article></article>
      </Container>
    </Layout>
  );
}
