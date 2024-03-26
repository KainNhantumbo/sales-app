import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _adEditor as Container } from '@/styles/common/advertisements-editor';

export default function Page() {
  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Editor de  Anúncios` }}>
      <Container>
      <article></article>

      </Container>
    </Layout>
  );
}
