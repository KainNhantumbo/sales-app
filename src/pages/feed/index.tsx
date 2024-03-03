import Layout from '@/components/Layout';
import SearchStories from '@/components/SearchStories';
import SideBarAds from '@/components/SidaBarAds';
import StoriesRenderer from '@/components/StoriesRenderer';
import { complements } from '@/data/data';
import { _feed as Container } from '@/styles/common/feed';

export default function Feed() {
  return (
    <Layout
      metadata={{
        title: String.prototype.concat(complements.defaultTitle, ' | Feed')
      }}>
      <Container>
        <div className='searchbar-wrapper'>
          <SearchStories key={'feed'} />
        </div>
        <div className='wrapper-container'>
          <SideBarAds key={'feed'} />
          <article>
            <StoriesRenderer key={'feed'} />
          </article>
        </div>
      </Container>
    </Layout>
  );
}
