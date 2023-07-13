import { NextPage } from 'next';
import { FeedContainer as Container } from '@/styles/common/feed';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import StoriesRenderer from '@/components/StoriesRenderer';
import SearchStories from '@/components/SearchStories';
import SideBarAds from '@/components/SidaBarAds';

const Feed: NextPage = (): JSX.Element => {
  return (
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
};

export default Feed;
