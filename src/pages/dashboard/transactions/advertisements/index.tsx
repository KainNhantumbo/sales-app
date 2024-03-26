import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _adTransactions as Container } from '@/styles/common/transactions-advertisements';

export default function Page() {
  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Pagamento de  Anúncios` }}>
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}
