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
import type { IBlogPost, IBlogPosts } from '@/../../@types/index';
import { PostContainer as Container } from '@/styles/common/post';
import { useTheme } from 'styled-components';

interface IPost {
  post: IBlogPost;
  latestPosts: IBlogPosts[];
}

export default function Post({ post, latestPosts }: IPost): JSX.Element {
  const router = useRouter();
  const colors = useTheme();
  const readingProps = readingTime(
    post.content.concat(post.excerpt),
    undefined,
    'pt-br'
  );
  const shareMedia = shareUrls({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    siteName: '',
  });

  return (
    <Layout
      metadata={{
        title: post.title,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt,
      }}>
      <Container className='wrapper'>
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
                    {author.name}
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
                src={post.cover_image.url}
                alt={post.title}
              />
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
                          src={post.cover_image.url}
                          alt={`Image of ${post.title} article.`}
                        />
                        <div className='content-container'>
                          <div className='details'>
                            
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
  const data = (
    await Promise.all([getPost(slug), getPosts({ limit: 3, offset: 0 })])
  ).map((res) => res.data);
  return {
    props: { post: { ...data[0] }, latestPosts: [...data[1]] },
    revalidate: 10,
  };
}
