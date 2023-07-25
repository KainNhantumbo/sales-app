import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import SideBarAds from '@/components/SidaBarAds';
import SearchStories from '@/components/SearchStories';
import StoriesRenderer from '@/components/StoriesRenderer';
import { FeedContainer as Container } from '@/styles/common/feed';

const Feed: NextPage = (): JSX.Element => (
  <Layout
    metadata={{
      title: String.prototype.concat(complements.defaultTitle, ' | Feed'),
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

export default Feed;
