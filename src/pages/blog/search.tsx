import Link from 'next/link';
import moment from 'moment';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { IBlogPosts } from '../../../@types/index';
import { getPosts } from '@/lib/queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoLibraryOutline, IoOpenOutline } from 'react-icons/io5';
import SearchComponent from '@/components/Search';
import { BlogContainer as Container } from '@/styles/common/blog';
import { IoIosPlanet, IoMdCalendar } from 'react-icons/io';
import { DotLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function BlogSearch() {
  const router = useRouter();
  const theme = useTheme();
  const [posts, setPosts] = useState<IBlogPosts[]>([]);
  const [loading, setLoading] = useState<{ status: boolean }>({
    status: false,
  });
  const [error, setError] = useState<{ status: boolean; msg: string }>({
    status: false,
    msg: '',
  });

  async function fetchPosts(): Promise<void> {
    setError({ status: false, msg: '' });
    setLoading({ status: true });
    try {
      const { data } = await getPosts({
        search: router.query?.q as string,
      });
      setPosts(data);
      if (data?.length === 0) {
        setError({
          status: true,
          msg: 'Não há resultados para a sua pesquisa',
        });
      }
    } catch (e: any) {
      console.error(e);
      setError({
        status: true,
        msg: 'Um erro ocorreu durante o processamento da sua requisição. Por favor, tente mais tarde',
      });
    } finally {
      setLoading({ status: false });
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (router.query['q']) {
        fetchPosts();
      }
    }, 500);
  }, [router.query]);

  useEffect(() => {
    return () => {
      setLoading({ status: false });
    };
  }, []);

  return (
    <Layout>
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
                lineHeight: '1.8rem',
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
                          <IoMdCalendar />
                          <span>{moment(post.updatedAt).format('LL')}</span>
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
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
