import Layout from '@/components/layout';
import { SearchStories } from '@/components/stories-search';
import { SideBarAds } from '@/components/sidebar-ads';
import { StoriesRenderer } from '@/components/stories-renderer';
import { constants } from '@/data/constants';
import { _feed as Container } from '@/styles/common/feed';

export default function Page() {
  return (
    <Layout
      metadata={{
        title: String.prototype.concat(constants.defaultTitle, ' | Feed')
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
