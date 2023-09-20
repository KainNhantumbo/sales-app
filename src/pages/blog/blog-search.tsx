import {
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoGridOutline,
  IoHeart,
  IoLibraryOutline,
  IoReload,
} from 'react-icons/io5';
import Link from 'next/link';
import { useEffect } from 'react';
import { IBlogPosts } from '@/types';
import actions from '@/shared/actions';
import { useRouter } from 'next/router';
import { formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';
import { getPosts } from '@/lib/queries';
import { complements } from '@/shared/data';
import NewsLetter from '@/components/Newsletter';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppContext } from '@/context/AppContext';
import { DotLoader, PulseLoader } from 'react-spinners';
import SearchComponent from '@/components/SearchBlogPosts';
import { useTheme } from 'styled-components';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { _blogSeach as Container } from '@/styles/common/blog-search';
import { useInView } from 'react-intersection-observer';

export default function BlogSearch() {
  const LIMIT: number = 8;
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView } = useInView();

  const fetchPosts = async ({
    pageParam = 0,
  }): Promise<{ data: IBlogPosts[]; currentOffset: number }> => {
    const { data } = await getPosts<IBlogPosts[]>({
      offset: pageParam * LIMIT,
      limit: LIMIT,
      search: String(router.query['q']),
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const {
    data,
    refetch,
    fetchNextPage,
    error,
    hasNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['blog-posts-search'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
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
          blogPostsList: [...reducedPosts],
        },
      });
    }

    return () => {
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] },
      });
    };
  }, [data]);

  useEffect(() => {
    const fetchTimer = setTimeout(() => {
      if (router.query['q']) {
        refetch({ queryKey: ['blog-posts-search'] });
      }
    }, 500);
    return () => {
      clearTimeout(fetchTimer);
    };
  }, [router.query]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Pesquisa de Postagens`,
      }}>
      <Container>
        <div className='main-container'>
          <SearchComponent />

          {isLoading && !isError && (
            <section className='fetching-state'>
              <div className='center'>
                <DotLoader size={60} color={`rgb(${theme.primary})`} />
                <span>Pesquisando...</span>
              </div>
            </section>
          )}

          <article>
            <section
              style={{
                fontWeight: '400',
                fontSize: '1.4rem',
                lineHeight: '1.8rem',
              }}>
              Pesquisou por: {router.query['q']}
            </section>

            {!isLoading ||
              (isLoading && isError && (
                <section className='error-message'>
                  <IoLibraryOutline />
                  <p>
                    {(error as any).response?.data?.message ||
                      'Erro ao processar a sua requisição.'}
                  </p>
                </section>
              ))}

            {isLoading && !isError && state.blogPostsList.length < 1 && (
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
                          onClick={() =>
                            router.push(`/blog/post/${post.slug}`)
                          }>
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
                  {isError && isLoading && (
                    <div className='fetch-error-message '>
                      <h3>Erro ao carregar postagens</h3>
                      <button onClick={fetchNextPage}>
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
                          display: 'block',
                        }}
                      />
                    </div>
                  )}

                  {!hasNextPage &&
                    isLoading &&
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
        </div>
      </Container>
    </Layout>
  );
}
