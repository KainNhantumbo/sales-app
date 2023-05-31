import {
  IoEllipsisHorizontal,
  IoHeart,
  IoLibraryOutline,
  IoOpenOutline
} from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getPosts } from '@/lib/queries';
import Layout from '@/components/Layout';
import { DotLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/time-fns';
import { useTheme } from 'styled-components';
import { complements } from '@/data/app-data';
import NewsLetter from '@/components/Newsletter';
import SearchComponent from '@/components/Search';
import { IBlogPosts } from '../../../@types/index';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { BlogSeachContainer as Container } from '@/styles/common/blog-search';

export default function BlogSearch() {
  const theme = useTheme();
  const router = useRouter();
  const [posts, setPosts] = useState<IBlogPosts[]>([]);
  const [loading, setLoading] = useState<{ status: boolean }>({
    status: false
  });
  const [error, setError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: ''
  });

  async function fetchPosts(): Promise<void> {
    setError({ status: false, msg: '' });
    setLoading({ status: true });
    try {
      const { data } = await getPosts({
        search: router.query?.q as string
      });
      setPosts(data);
      if (data?.length === 0) {
        setError({
          status: true,
          msg: 'Não há resultados para a sua pesquisa'
        });
      }
    } catch (e: any) {
      console.error(e);
      setError({
        status: true,
        msg: 'Um erro ocorreu durante o processamento da sua requisição. Por favor, tente mais tarde'
      });
    } finally {
      setLoading({ status: false });
    }
  }

  useEffect((): (() => void) => {
    const fetchTimer = setTimeout(() => {
      if (router.query['q']) {
        fetchPosts();
      }
    }, 500);
    return (): void => {
      clearTimeout(fetchTimer);
    };
  }, [router.query]);

  useEffect((): (() => void) => {
    return (): void => {
      setLoading({ status: false });
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Pesquisa de Postagens`
      }}>
      <Container>
        <div className='main-container'>
          <section className='search-container'>
            <SearchComponent />
          </section>

          {loading.status && !error.status && (
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
                lineHeight: '1.8rem'
              }}>
              Pesquisou por: {router.query?.q}
            </section>

            {!loading.status && error.status && (
              <section className='error-message'>
                <IoLibraryOutline />
                <p>{error.msg}</p>
              </section>
            )}

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
                        <IoOpenOutline />
                        <span>Continuar leitura</span>
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
        </div>
      </Container>
    </Layout>
  );
}
