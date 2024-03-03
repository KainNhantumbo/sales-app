import buyingWomenImg from '@/../public/assets/buying_women.png';
import Layout from '@/components/Layout';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/SearchBlogPosts';
import { useAppContext } from '@/context/AppContext';
import { blurDataUrlImage, complements } from '@/data/data';
import { getPosts } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { actions } from '@/shared/actions';
import { _blog as Container } from '@/styles/common/blog';
import { Posts } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import {
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoGridOutline,
  IoHeart,
  IoReload,
  IoStorefrontOutline
} from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Blog() {
  const LIMIT: number = 8;
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  async function fetchPosts({ pageParam = 0 }) {
    const { data } = await getPosts<Posts[]>({
      offset: pageParam * LIMIT,
      limit: LIMIT
    });
    return { data, currentOffset: pageParam + 1 };
  }

  const { data, fetchNextPage, hasNextPage, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['blog-posts'],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
    });

  useEffect(() => {
    if (data) {
      const reducedPosts = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: {
          ...state,
          blogPostsList: [...reducedPosts]
        }
      });
    }

    return () => {
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] }
      });
    };
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

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
          <SearchComponent />

          {!isLoading && !isError && state.blogPostsList.length < 1 && (
            <div className='empty-data_container'>
              <section className='content'>
                <div className='icon'>
                  <IoGridOutline />
                </div>
                <div className='message'>
                  <h3>Nenhuma postagem para mostrar.</h3>
                </div>
              </section>
            </div>
          )}

          {state.blogPostsList.length > 0 && (
            <section className='posts-container'>
              {state.blogPostsList.map((post, index) => (
                <Link
                  key={post._id}
                  className={'post'}
                  href={`/blog/post/${post.slug}`}
                  ref={
                    state.blogPostsList.length === index + 1 ? ref : undefined
                  }>
                  <>
                    <Image
                      width={3000}
                      height={3000}
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

              <div className='stats-container'>
                {isError && !isLoading && (
                  <div className=' fetch-error-message '>
                    <h3>Erro ao carregar postagens</h3>
                    <button onClick={() => fetchNextPage()}>
                      <IoReload />
                      <span>Tentar novamente</span>
                    </button>
                  </div>
                )}

                {isLoading && !isError && (
                  <div className='loading'>
                    <PulseLoader
                      size={20}
                      color={`rgb(${theme.primary_shade})`}
                      aria-placeholder='Processando...'
                      cssOverride={{
                        display: 'block'
                      }}
                    />
                  </div>
                )}

                {!hasNextPage &&
                  !isLoading &&
                  !isError &&
                  state.blogPostsList.length > 0 && <p>Chegou ao fim</p>}
              </div>

              {state.blogPostsList.length > 0 && (
                <div className='posts-container__end-mark'>
                  <IoEllipsisHorizontal />
                </div>
              )}
            </section>
          )}
        </article>
        <NewsLetter />
      </Container>
    </Layout>
  );
}
