import {
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoHeart,
  IoStorefrontOutline
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import ErrorPage from '../error-page';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { getPosts } from '@/lib/queries';
import { formatDate } from '@/lib/time-fns';
import { IBlogPosts } from '../../../@types';
import { complements } from '@/data/app-data';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/Search';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { BlogContainer as Container } from '@/styles/common/blog';
import buyingWomenImg from '../../../public/assets/buying_women.png';

type Props = { posts: IBlogPosts[] };

export default function Blog(props: Props): JSX.Element {
  const { posts } = props;
  const router = useRouter();
  if (!posts) {
    return <ErrorPage retryFn={router.reload} />;
  }

  return (
    <Layout metadata={{ title: complements.defaultTitle + ' | Blog' }}>
      <Container>
        <section className='banner-container'>
          <div className='wrapper'>
            <div className='title'>
              <h1>Blog da {complements.defaultTitle}</h1>
              <p>
                <strong>
                  Explore idéias, conceitos e dicas que possam ajudar a
                  alavancar o seu negócio.
                </strong>{' '}
                Ainda não tem uma loja? Monte hoje mesmo uma loja virtual do seu
                jeito e com todas funcionalidades que você precisa de graça!
              </p>
              <Link href={'/auth/sign-in'}>
                <IoStorefrontOutline />
                <span>Criar loja grátis</span>
              </Link>
            </div>

            <Image
              src={buyingWomenImg}
              alt='buying women art from freepick.com'
            />
          </div>
        </section>
        <article>
          <section className='search-container'>
            <SearchComponent />
          </section>

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
                        <IoIosAlbums />
                        <span>{post.category || 'Miscelânia'}</span>
                      </div>
                      <div>
                        <IoMdCalendar />
                        <span>{formatDate(post.updatedAt)}</span>
                      </div>
                      <div>
                        <IoHeart />
                        <span>{post.favorites.length} favoritos</span>
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
            {posts.length > 0 && (
              <div className='posts-container__end-mark'>
                <IoEllipsisHorizontal />
              </div>
            )}
          </section>
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  try {
    const { data } = await getPosts({});
    return { props: { posts: [...data] }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
