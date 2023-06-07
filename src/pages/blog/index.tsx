import {
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoHeart,
  IoStorefrontOutline
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import ErrorPage from '../error-page';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { actions } from '@/data/actions';
import { getPosts } from '@/lib/queries';
import { formatDate } from '@/lib/time-fns';
import { IBlogPosts } from '../../../@types';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/Search';
import { useAppContext } from '@/context/AppContext';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { blurDataUrlImage, complements } from '@/data/app-data';
import { BlogContainer as Container } from '@/styles/common/blog';
import buyingWomenImg from '../../../public/assets/buying_women.png';

type Props = { posts: IBlogPosts[] };

export default function Blog(props: Props): JSX.Element {
  const { posts } = props;
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [status, setStatus] = useState({
    loading: false,
    error: false,
    hasMorePosts: true
  });

  if (!posts) {
    return <ErrorPage retryFn={router.reload} />;
  }

  async function fetchPosts({ pageParam = 0 }) {
    const { data } = await getPosts({ offset: pageParam * 3, limit: 3 });
    return { data, currentOffset: pageParam + 1 };
  }

  useEffect(() => {
    if (state.blogPostsList.length > 0) return;
    dispatch({
      type: actions.BLOG_POSTS_LIST_QUERY,
      payload: {
        ...state,
        blogPostsList: [...state.blogPostsList, ...posts]
      }
    });

    return () => {
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] }
      });
    };
  }, [posts]);

  // const {
  //   data,
  //   error,
  //   fetchNextPage,
  //   hasNextPage,
  //   isFetching,
  //   isFetchingNextPage,
  //   status
  // } = useInfiniteQuery({
  //   queryKey: ['blog-posts'],
  //   queryFn: fetchPosts,
  //   getNextPageParam: (lastPage, pages) => lastPage.currentOffset
  // });

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
              blurDataURL={blurDataUrlImage}
              alt='buying women art from freepick.com'
              priority
            />
          </div>
        </section>
        <article>
          <section className='search-container'>
            <SearchComponent />
          </section>

          <section className='posts-container'>
            {state.blogPostsList.map((post) => (
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
            <button onClick={() => {}}>Get next page</button>

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
    const { data } = await getPosts({ offset: 0, limit: 3 });
    return { props: { posts: [...data] }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
