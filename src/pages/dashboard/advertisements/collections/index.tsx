import Layout from '@/components/layout';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { useAdsQuery } from '@/hooks/use-ads-query';
import { _adCollections as Container } from '@/styles/common/advertisements-collections';

export default function Page() {
const {inViewRef, fetchNextPage, refetch, isLoading, hasNextPage} = useAdsQuery()
const {state: {ads}, dispatch} = useAppContext()

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Anúncios` }}>
      <Container>

      <article>

<section className='ads-list-container'>
  {ads.length> 0 ? ads.map((item, i)=> (<div key={i} className='ad-container'></div>))  : null}

</section>
      </article>
      </Container>
    </Layout>
  );
}
