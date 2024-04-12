import Layout from '@/components/layout';
import { NewsLetter } from '@/components/newsletter';
import { PostsSearch } from '@/components/posts-search';
import { useAppContext } from '@/context/app-context';
import { constants } from '@/data/constants';
import { useBlogSearchQuery } from '@/hooks/use-blog-search-query';
import { formatDate } from '@/lib/utils';
import { _blogSearch as Container } from '@/styles/common/blog-search';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import * as Io from 'react-icons/io5';
import { DotLoader, PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { state } = useAppContext();
  const { inViewRef, error, fetchNextPage, hasNextPage, isError, isLoading } =
    useBlogSearchQuery();

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Pesquisa de Postagens`
      }}>
      <Container>
        <div className='main-container'>
          <PostsSearch />

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
              style={{ fontWeight: '400', fontSize: '1.4rem', lineHeight: '1.8rem' }}>
              Pesquisou por: {router.query['q']}
            </section>

            {!isLoading ||
              (isLoading && isError && (
                <section className='error-message'>
                  <Io.IoLibraryOutline />
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
                    <Io.IoGridOutline />
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
                    ref={state.blogPostsList.length === index + 1 ? inViewRef : undefined}>
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
                            <span>{post.category || 'Miscelânea'}</span>
                          </div>
                          <div>
                            <IoMdCalendar />
                            <span>{formatDate(post.updatedAt)}</span>
                          </div>
                          <div>
                            <Io.IoHeart />
                            <span>{post.favorites.length} favoritos</span>
                          </div>
                        </div>
                        <h3>{post.title}</h3>
                        <p>{post.excerpt}</p>
                        <button onClick={() => router.push(`/blog/post/${post.slug}`)}>
                          <div>
                            <Io.IoArrowForwardOutline />
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
                      <button onClick={() => fetchNextPage()}>
                        <Io.IoReload />
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
                    isLoading &&
                    !isError &&
                    state.blogPostsList.length > 0 && <p>Chegou ao fim</p>}
                </div>

                {state.blogPostsList.length > 0 && (
                  <div className='posts-container__end-mark'>
                    <Io.IoEllipsisHorizontal />
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
