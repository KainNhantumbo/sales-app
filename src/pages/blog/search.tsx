import Link from 'next/link';
import moment from 'moment';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import { IBlogPosts } from '../../../@types/index';
import { getPosts } from '@/lib/queries';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoOpenOutline } from 'react-icons/io5';
import SearchComponent from '@/components/Search';
import { HomeContainer as Container } from '@/styles/common/home';
import { IoIosPlanet, IoMdCalendar } from 'react-icons/io';

export default function BlogSearch() {
  const router = useRouter();
  const [posts, setPosts] = useState<IBlogPosts[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function fetchPosts(): Promise<void> {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const { data } = await getPosts({
        search: router.query?.q as string,
      });
      setPosts(data);
      setIsLoading(false);
      if (data?.length === 0) {
        setErrorMessage('Não há resultados para a sua pesquisa.');
      }
    } catch (e: any) {
      console.error(e);
      setIsLoading(false);
      setErrorMessage(
        `Um erro ocorreu durante o processamento da sua requisição. Por favor, tente mais tarde.`
      );
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (router.query['q']) {
        fetchPosts();
      }
    }, 500);
  }, [router.query]);

  return (
    <Layout>
      <Container>
        <section className='search-container'>
          <SearchComponent />
        </section>

        <article>
          <section
            style={{
              fontWeight: '400',
              fontSize: '1.4rem',
              lineHeight: '1.8rem',
            }}>
            Searched for: {router.query?.q}
          </section>

          {isLoading ? (
            <Loader message='Loading...' />
          ) : errorMessage ? (
            <section className='error-message'>
              <IoIosPlanet />
              <p>{errorMessage}</p>
            </section>
          ) : (
            <section className='posts-container'>
              {posts.map((post) => (
                <Link
                  key={post._id}
                  className={'post'}
                  href={`/post/${post.slug}`}>
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
                      <button onClick={() => router.push(`/post/${post.slug}`)}>
                        <IoOpenOutline />
                        <span>Read more</span>
                      </button>
                    </div>
                  </>
                </Link>
              ))}
            </section>
          )}
        </article>
      </Container>
    </Layout>
  );
}
