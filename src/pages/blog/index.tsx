import {
  IoArrowForwardOutline,
  IoEllipsisHorizontal,
  IoHeart,
  IoReload,
  IoStorefrontOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import { useEffect } from 'react';
import Image from 'next/image';
import { NextRouter, useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { actions } from '@/data/actions';
import { getPosts } from '@/lib/queries';
import { formatDate } from '@/lib/utils';
import { DefaultTheme, useTheme } from 'styled-components';
import { PulseLoader } from 'react-spinners';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/Search';
import { useAppContext } from '@/context/AppContext';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { blurDataUrlImage, complements } from '@/data/app-data';
import { BlogContainer as Container } from '@/styles/common/blog';
import buyingWomenImg from '../../../public/assets/buying_women.png';

export default function Blog(): JSX.Element {
  const LIMIT: number = 8;
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const { state, dispatch } = useAppContext();
  const { ref, inView }: InViewHookResponse = useInView();

  const { data, fetchNextPage, hasNextPage, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ['blog-posts'],
      queryFn: fetchPosts,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
    });

  async function fetchPosts({
    pageParam = 0,
  }): Promise<{ data: any; currentOffset: number }> {
    const { data } = await getPosts({
      offset: pageParam * LIMIT,
      limit: LIMIT,
    });
    return { data, currentOffset: pageParam + 1 };
  }

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

  useEffect((): void => {
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
          <section className='search-container'>
            <SearchComponent />
          </section>

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
              {isError && !isFetching && (
                <div className=' fetch-error-message '>
                  <h3>Erro ao carregar postagens</h3>
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
                state.blogPostsList.length > 0 && <p>Chegou ao fim</p>}
            </div>

            {state.blogPostsList.length > 0 && (
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
