import {
  IoEllipsisHorizontal,
  IoHeart,
  IoLibraryOutline,
  IoOpenOutline,
  IoReload,
} from 'react-icons/io5';
import Link from 'next/link';
import { NextPage } from 'next';
import { IBlogPosts } from '@/../@types';
import { formatDate } from '@/lib/utils';
import Layout from '@/components/Layout';
import { getPosts } from '@/lib/queries';
import { DotLoader, PulseLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { complements } from '@/data/app-data';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/SearchBlogPosts';
import { NextRouter, useRouter } from 'next/router';
import { DefaultTheme, useTheme } from 'styled-components';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { BlogSeachContainer as Container } from '@/styles/common/blog-search';
import { useAppContext } from '@/context/AppContext';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { actions } from '@/data/actions';

const BlogSearch: NextPage = (): JSX.Element => {
  const LIMIT: number = 8;
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView }: InViewHookResponse = useInView();

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
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['blog-posts-search'],
    queryFn: fetchPosts,
    getNextPageParam: (lastPage) =>
      lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
  });

  useEffect((): (() => void) => {
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

    return (): void => {
      dispatch({
        type: actions.BLOG_POSTS_LIST_QUERY,
        payload: { ...state, blogPostsList: [] },
      });
    };
  }, [data]);

  useEffect((): (() => void) => {
    const fetchTimer = setTimeout(() => {
      if (router.query['q']) {
        refetch({ queryKey: ['blog-posts-search'] });
      }
    }, 500);
    return (): void => {
      clearTimeout(fetchTimer);
    };
  }, [router.query]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Pesquisa de Postagens`,
      }}>
      <Container>
        <div className='main-container'>
          <SearchComponent />

          {isFetching ||
            (isLoading && !isError && (
              <section className='fetching-state'>
                <div className='center'>
                  <DotLoader size={60} color={`rgb(${theme.primary})`} />
                  <span>Pesquisando...</span>
                </div>
              </section>
            ))}

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
              (!isFetching && isError && (
                <section className='error-message'>
                  <IoLibraryOutline />
                  <p>
                    {(error as any).response?.data?.message ||
                      'Erro ao processar a sua requisição.'}
                  </p>
                </section>
              ))}

            {state.blogPostsList.length > 0 && (
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
                          onClick={() =>
                            router.push(`/blog/post/${post.slug}`)
                          }>
                          <IoOpenOutline />
                          <span>Continuar leitura</span>
                        </button>
                      </div>
                    </>
                  </Link>
                ))}

                <div className='stats-container'>
                  {isError && !isFetching && (
                    <div className=' fetch-error-message '>
                      <h3>Erro ao carregar os dados.</h3>
                      <button onClick={() => fetchNextPage()}>
                        <IoReload />
                        <span>Tentar novamente</span>
                      </button>
                    </div>
                  )}

                  {isFetching && !isError && (
                    <div className='loading'>
                      <PulseLoader
                        size={20}
                        color={`rgb(${theme.primary_variant})`}
                        aria-placeholder='Processando...'
                        cssOverride={{
                          display: 'block',
                        }}
                      />
                    </div>
                  )}

                  {!hasNextPage &&
                    !isFetching &&
                    !isError &&
                    state.blogPostsList.length > 0 && (
                      <p>Sem mais dados para mostrar</p>
                    )}
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
};

export default BlogSearch;
