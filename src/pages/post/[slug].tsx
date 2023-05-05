import {
  IoIosAlbums,
  IoIosBookmark,
  IoMdCalendar,
  IoMdTime,
} from 'react-icons/io';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import shareUrls from '@/lib/share-urls';
import { motion } from 'framer-motion';
import { author } from '@/data/app-data';
import { formatDate } from '@/lib/time-fns';
import { useState, useEffect } from 'react';
import { IoOpenOutline } from 'react-icons/io5';
import { readingTime } from 'reading-time-estimator';
import { useAppContext } from '@/context/AppContext';
import { getPaths, getPost, getPosts } from '@/lib/queries';
import type { Post, PostList } from '@/../../@types/index';
import { PostContainer as Container } from '@/styles/common/post';

interface IPost {
  post: Post;
  latestPosts: PostList[];
}

export default function Post({ post, latestPosts }: IPost): JSX.Element {
  const router = useRouter();
  const { colors } = useAppContext();
  const readingProps = readingTime(
    post.content.concat(post.excerpt),
    undefined,
    'en'
  );
  const shareMedia = shareUrls({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    siteName: '',
  });

  // read percentage bar funtionns
  const [screenPosition, setScreenPosition] = useState(0);
  function computePageInnerWidth() {
    const wrapper = document.querySelector('.main-container');
    const calc = (window.pageYOffset * 100) / wrapper?.scrollHeight!;
    setScreenPosition(calc);
  }

  useEffect(() => {
    window.addEventListener('wheel', computePageInnerWidth);
    return () => {
      window.removeEventListener('wheel', computePageInnerWidth);
    };
  }, []);

  return (
    <Layout
      metadata={{
        title: post.title,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt,
        tags: post.tags.toString(),
      }}>
      <Container className='.wrapper'>
        <div
          style={{
            height: '4px',
            width: `${screenPosition.toString()}%`,
            backgroundColor: `rgba(${colors.secondary}, .8)`,
            position: 'fixed',
            top: '0px',
            left: '0px',
            zIndex: '999999',
            transition: '200ms',
          }}
        />

        <div className='main-container'>
          <article>
            <section className={'article-header-container'}>
              <h1 title={post.title}>
                <strong>{post.title}</strong>
              </h1>
              <section className='author-container'>
                <div className='author'>
                  <Image
                    width={30}
                    src={author.picture as any}
                    alt='article author photo'
                  />
                  <div>
                    <span>{author.name}</span>
                  </div>
                </div>
                <div className='share-options'>
                  <div className='title'>Share this article:</div>
                  <div className='options'>
                    {shareMedia.map((option) => (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        href={option.url}
                        title={option.name}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        key={option.name}>
                        {<option.icon />}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
              <section className='reading-props'>
                <div>
                  <IoIosAlbums />
                  <span style={{ color: `rgb(${colors.secondary})` }}>
                    {post.category}
                  </span>
                </div>
                <div>
                  <IoMdCalendar />
                  <span>{moment(post.updatedAt).format('MMMM DD, YYYY')}</span>
                </div>
                <div>
                  <IoMdTime />
                  <span>{readingProps.text}</span>
                </div>
                <div>
                  <IoIosBookmark />
                  <span>{readingProps.words} words</span>
                </div>
              </section>
              <h4>{post.excerpt}</h4>
              <img
                className='article-image'
                src={post.cover_image}
                alt={post.title}
              />
              <section className='tags-container'>
                {post.tags.length > 0 && (
                  <>
                    <span className='title'>Tags:</span>
                    <div className='tags'>
                      {post.tags.map((tag, index) => (
                        <span key={index.toString()}>{tag}</span>
                      ))}
                    </div>
                  </>
                )}
              </section>
            </section>

            <section
              id='content'
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <section className='base-container'>
              <section className='share-options'>
                <div className='title'>Share this article:</div>
                <div className='options'>
                  {shareMedia.map((option) => (
                    <motion.a
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.8 }}
                      href={option.url}
                      title={option.name}
                      target={'_blank'}
                      rel={'noreferrer noopener'}
                      key={option.name}>
                      {<option.icon />}
                    </motion.a>
                  ))}
                </div>
              </section>


              <section className='author-container'>
                <Image src={author.picture} alt='article author photo' />
                <div>
                  <h3>{author.name}</h3>
                  <span className='description'>{author.description}</span>
                </div>
              </section>
            </section>

            <section className='featured-posts-container'>
              <h2>
                <strong>Latest Articles</strong>
              </h2>
              <div className='posts-container'>
                {latestPosts
                  .filter((item) => item._id !== post._id)
                  .map((post) => (
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
                            <span>Continuar a ler...</span>
                          </button>
                        </div>
                      </>
                    </Link>
                  ))}
              </div>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await getPaths();
  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  const data = await (
    await Promise.all([getPost(slug), getPosts({ limit: 3, offset: 0 })])
  ).map((res) => res.data);
  return {
    props: { post: { ...data[0] }, latestPosts: [...data[1]] },
    revalidate: 10,
  };
}
