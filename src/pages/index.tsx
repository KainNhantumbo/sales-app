import Link from 'next/link';
import Layout from '@/components/Layout';
import { PostList } from '../../@types';
import { getPosts } from '@/lib/queries';
import { useRouter } from 'next/router';
import { formatDate } from '@/lib/time-fns';
import { useAppContext } from '@/context/AppContext';
import { IoIosAlbums, IoMdCalendar } from 'react-icons/io';
import { HomeContainer as Container } from '@/styles/common/home';
import { IoChevronForward, IoOpenOutline } from 'react-icons/io5';
import SearchComponent from '@/components/SearchComponent';
interface IProps {
  categoriesList: PostList[][];
}

export default function Home(props: IProps): JSX.Element {
  const router = useRouter();
  const { categoriesList } = props;
  const { colors } = useAppContext();

  return (
    <Layout>
      <Container>
        <section className='search-container'>
          <SearchComponent />
        </section>

        <article>
          <section className='featured-posts-container'>
            {categoriesList
              .filter((arr) => arr.length > 0)
              .map((posts, index) => (
                <>
                  <div className='header'>
                    <h2>
                      <IoIosAlbums />
                      <span>{posts[0]?.category}</span>
                    </h2>

                    <Link
                      href={`/categories/${posts[0]?.category
                        .split(' ')
                        .join('-')
                        .toLocaleLowerCase()}`}>
                      <span>Show all</span>
                      <IoChevronForward />
                    </Link>
                  </div>

                  <section
                    key={index.toString()}
                    className={'category-posts-container'}>
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
                                <span
                                  style={{ color: `rgb(${colors.secondary})` }}>
                                  {post.category}
                                </span>
                              </div>
                              <div>
                                <IoMdCalendar />
                                <span>{formatDate(post.updatedAt)}</span>
                              </div>
                            </div>
                            <h3>{post.title}</h3>
                            <p>
                              {post.excerpt.length > 160
                                ? `${post.excerpt.slice(0, 160) + '...'}`
                                : post.excerpt}
                            </p>
                            <button
                              onClick={() => router.push(`/post/${post.slug}`)}>
                              <IoOpenOutline />
                              <span>Read more</span>
                            </button>
                          </div>
                        </>
                      </Link>
                    ))}
                  </section>
                </>
              ))}
          </section>
        </article>
      </Container>
    </Layout>
  );
}

export async function getStaticProps() {
  const data = await (
    await Promise.all([
      getPosts({
        category: 'Destinations',
        limit: 3,
        offset: 0,
      }),
      getPosts({ category: 'Tips', limit: 3, offset: 0 }),
      getPosts({
        category: 'Success Stories',
        limit: 3,
        offset: 0,
      }),
      getPosts({ category: 'Brands', limit: 3, offset: 0 }),
      getPosts({ category: 'Success Stories', limit: 3, offset: 0 }),
    ])
  ).map((res) => {
    if (res.data) return res.data;
  });

  return {
    props: { categoriesList: [...data] },
    revalidate: 10,
  };
}
