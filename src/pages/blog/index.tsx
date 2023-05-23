import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPosts } from '@/lib/queries';
import Layout from '@/components/Layout';
import { formatDate } from '@/lib/time-fns';
import { useTheme } from 'styled-components';
import { IBlogPosts } from '../../../@types';
import { useAppContext } from '@/context/AppContext';
import { IoMdCalendar } from 'react-icons/io';
import { IoArrowForwardOutline } from 'react-icons/io5';
import { BlogContainer as Container } from '@/styles/common/blog';
import SearchComponent from '@/components/Search';

type Props = { posts: IBlogPosts[] };

export default function Blog(props: Props): JSX.Element {
  const { posts } = props;
  const theme = useTheme();
  const router = useRouter();
  const { state } = useAppContext();

  return (
    <Layout>
      <Container>
        <section className='search-container'>
          <SearchComponent />
        </section>

        <article>
          <section className='posts-container'>
            {posts.map((post) => (
              <Link
                key={post._id}
                className={'post'}
                href={`/blog/post/${post.slug}`}>
                <>
                  <img
                    src={post.cover_image.url}
                    alt={`Image of ${post.title} article.`}
                  />

                  <div className='content-container'>
                    <div className='details'>
                      <div>
                        <IoMdCalendar />
                        <span>{formatDate(post.updatedAt)}</span>
                      </div>
                    </div>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                    <button
                      onClick={() => router.push(`/blog/post/${post.slug}`)}>
                      <div>
                        <IoArrowForwardOutline />
                        <span>Continuar leitura</span>
                      </div>
                    </button>
                  </div>
                </>
              </Link>
            ))}
          </section>
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await getPosts({});

  return {
    props: { posts: [...data] },
    revalidate: 10,
  };
}
