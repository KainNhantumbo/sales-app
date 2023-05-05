import Link from 'next/link';
import Layout from '@/components/Layout';
import { motion } from 'framer-motion';
import { FaWind } from 'react-icons/fa';
import { getPosts } from '@/lib/queries';
import { PostList } from '../../../@types';
import { useEffect, useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { HomeContainer as Container } from '@/styles/common/home';
import { formatDate } from '@/lib/time-fns';
import { useRouter } from 'next/router';
import { HiDotsHorizontal, HiX } from 'react-icons/hi';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { IoChevronDown, IoOpenOutline } from 'react-icons/io5';
import SearchComponent from '@/components/SearchComponent';
interface IProps {
  posts: PostList[];
}
export default function Tips(props: IProps): JSX.Element {
  const router = useRouter();
  const { posts: data } = props;
  const [posts, setPosts] = useState<PostList[]>(data);
  const { pageProps, setPageProps, colors } = useAppContext();

  // pagination
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  async function refetchPosts() {
    try {
      setIsLoading(true);
      const { data } = await getPosts({
        category: 'Tips',
        offset: pageProps.offset,
        limit: pageProps.limit,
      });
      if (data?.length < pageProps.limit) {
        setHasMorePosts(false);
      } else {
        setPageProps((props) => ({
          offset: props.offset + 10,
          limit: props.limit,
        }));
        setHasMorePosts(true);
        setPosts((props) => [...props, ...data]);
      }
      setIsLoading(false);
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setIsLoading(false);
      setIsError(true);
    }
  }

  useEffect(() => {
    setPageProps({ offset: 10, limit: 10 });
  }, []);

  return (
    <Layout>
      <Container>
        <section className='search-container'>
          <SearchComponent />
        </section>

        <article>
          {posts.length < 1 ? (
            <section className='error-message'>
              <IoIosAlbums />
              <p>No articles for section are available yet</p>
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
                      src={post.cover_image}
                      alt={`Image of ${post.title} article.`}
                    />

                    <div className='content-container'>
                      <div className='details'>
                        <div>
                          <IoIosAlbums />
                          <span style={{ color: `rgb(${colors.secondary})` }}>
                            {post.category}
                          </span>
                        </div>
                        <div>
                          <IoMdCalendar />
                          <span>{formatDate(post.updatedAt)}</span>
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
        <section className='load-posts-container'>
          <motion.button
            whileTap={{ scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            disabled={isLoading ? true : hasMorePosts ? false : true}
            onClick={() => {
              if (!hasMorePosts) return;
              refetchPosts();
            }}>
            {isLoading ? (
              <HiDotsHorizontal />
            ) : hasMorePosts ? (
              <IoChevronDown />
            ) : isError ? (
              <HiX color='red' />
            ) : (
              <FaWind />
            )}
            <span>
              {isLoading
                ? 'Loading'
                : hasMorePosts
                ? 'Load more'
                : isError
                ? 'Fetch failed, try again'
                : 'Reached the end'}
            </span>
          </motion.button>
        </section>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data } = await getPosts({ category: 'Tips', offset: 0, limit: 10 });
  return {
    props: { posts: data },
    revalidate: 10,
  };
}
