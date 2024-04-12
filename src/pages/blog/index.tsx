import buyingWomenImg from '@/../public/assets/buying_women.png';
import Layout from '@/components/layout';
import { NewsLetter } from '@/components/newsletter';
import { PostsSearch } from '@/components/posts-search';
import { useAppContext } from '@/context/app-context';
import { blurDataUrlImage, constants } from '@/data/constants';
import { useBlogPostsQuery } from '@/hooks/use-blog-posts-query';
import { formatDate } from '@/lib/utils';
import { _blog as Container } from '@/styles/common/blog';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as Io from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const router = useRouter();
  const { state } = useAppContext();
  const { fetchNextPage, hasNextPage, inViewRef, isError, isLoading } = useBlogPostsQuery();

  return (
    <Layout metadata={{ title: constants.defaultTitle + ' | Blog' }}>
      <Container>
        <section className='banner-container'>
          <div className='wrapper'>
            <div className='title'>
              <h1>Blog da {constants.defaultTitle}</h1>
              <p>
                <strong>
                  Explore ideias, conceitos e dicas que possam ajudar a alavancar o seu
                  negócio.
                </strong>{' '}
                Ainda não tem uma loja? Monte hoje mesmo uma loja virtual do seu jeito e com
                todas funcionalidades que você precisa de graça! informação é
              </p>
              <Link href={'/auth/sign-in'}>
                <Io.IoStorefrontOutline />
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
          <PostsSearch />

          {!isLoading && !isError && state.blogPostsList.length < 1 && (
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
                          <Io.IoAlbums />
                          <span>{post.category || 'Miscelânea'}</span>
                        </div>
                        <div>
                          <Io.IoCalendar />
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
                {isError && !isLoading && (
                  <div className=' fetch-error-message '>
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
                  !isLoading &&
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
      </Container>
    </Layout>
  );
}
