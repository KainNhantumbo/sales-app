import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _adCollections as Container } from '@/styles/common/advertisements-collections';

export default function Page() {
  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Anúncios` }}>
      <Container>

      <article></article>
      </Container>
    </Layout>
  );
}
