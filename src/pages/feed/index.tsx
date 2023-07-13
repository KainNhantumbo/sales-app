import { NextPage } from 'next';
import { FeedContainer as Container } from '@/styles/modules/feed';
import Layout from '@/components/Layout';
import { complements } from '@/data/app-data';
import { FaAd } from 'react-icons/fa';
import { IoAdd } from 'react-icons/io5';
import Link from 'next/link';
import StoriesRenderer from '@/components/StoriesRenderer';

const Feed: NextPage = (): JSX.Element => {
  return (
    <Layout
      metadata={{
        title: String.prototype.concat(complements.defaultTitle, ' | Feed'),
      }}>
      <Container>
        <div className='wrapper-container'>
          <aside>
            <section className='no-ads'>
              <FaAd className='ads-icon' />
              <h3>
                <span>Espaço reservado para anúncios</span>
              </h3>
              <Link href={`/users/dashboard/create-ad`}>
                <IoAdd />
                <span>Criar anúncio</span>
              </Link>
            </section>
          </aside>
          <article>
            <StoriesRenderer />
          </article>
        </div>
      </Container>
    </Layout>
  );
};

export default Feed;
