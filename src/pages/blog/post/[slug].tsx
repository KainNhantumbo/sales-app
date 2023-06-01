import {
  IoIosAlbums,
  IoIosBookmark,
  IoMdCalendar,
  IoMdTime
} from 'react-icons/io';
import {
  IoChatbubblesOutline,
  IoHeart,
  IoHeartOutline,
  IoOpenOutline
} from 'react-icons/io5';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/Layout';
import { shareUrls } from '@/lib/share-urls';
import { motion } from 'framer-motion';
import { author, complements } from '@/data/app-data';
import { formatDate } from '@/lib/time-fns';
import { readingTime } from 'reading-time-estimator';
import { getPaths, getPost, getPosts } from '@/lib/queries';
import type { IBlogPost, IBlogPosts } from '@/../../@types/index';
import { PostContainer as Container } from '@/styles/common/post';
import { useTheme } from 'styled-components';
import Comments from '@/components/Comments';
import { useAppContext } from '@/context/AppContext';
import ErrorPage from '@/pages/error-page';
import NewsLetter from '@/components/Newsletter';

interface IPost {
  post: IBlogPost;
  latestPosts: IBlogPosts[];
}

export default function Post({ post: initialPost, latestPosts }: IPost) {
  const { state, fetchAPI, loginPromptController } = useAppContext();
  const [post, setPost] = useState(initialPost);
  const router = useRouter();
  const theme = useTheme();

  if (!initialPost) {
    return <ErrorPage retryFn={router.reload} />;
  }

  const readingProps = readingTime(
    post.content.concat(post.excerpt),
    undefined,
    'pt-br'
  );

  const shareMedia = shareUrls({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    hostname: complements.websiteUrl
  });

  async function handleFavoritePost(): Promise<void> {
    try {
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/blog-posts/${post._id}`
      });
      const { data } = await getPost(post.slug);
      setPost((doc) => {
        return { ...doc, favorites: data.favorites };
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleUnFavoritePost(): Promise<void> {
    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/favorites/blog-posts/${post._id}`
      });
      const { data } = await getPost(post.slug);
      setPost((doc) => {
        return { ...doc, favorites: data.favorites };
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  return (
    <Layout
      metadata={{
        title: post.title,
        updatedAt: post.updatedAt,
        createdAt: post.createdAt
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
                    height={30}
                    src={author.picture as any}
                    alt='article author photo'
                  />
                  <span>{author.name}</span>
                </div>
                <div className='share-options'>
                  <div className='title'>Compartilhe:</div>
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
                  <span style={{ color: `rgb(${theme.primary_variant})` }}>
                    {post.category || 'Miscelânia'}
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
                  <span>{readingProps.words} Palavras</span>
                </div>
                <div>
                  <IoChatbubblesOutline />
                  <span>{state.commentsList.length} comentários</span>
                </div>
                <div>
                  <IoHeart />
                  <span>{post.favorites.length}</span>
                </div>
              </section>
              <h4>{post.excerpt}</h4>
              <Image
                width={900}
                height={480}
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
              <section className='favorites-wrapper'>
                <h2>
                  <span>Gostou da postagem?</span>
                </h2>
                <div>
                  <button
                    onClick={() => {
                      if (!state.userAuth.token) return loginPromptController();

                      post.favorites.includes(state.userAuth.id)
                        ? handleUnFavoritePost()
                        : handleFavoritePost();
                    }}>
                    {post.favorites.includes(state.userAuth.id) ? (
                      <IoHeart />
                    ) : (
                      <IoHeartOutline />
                    )}
                    <span>{post.favorites.length} Favoritar</span>
                  </button>
                </div>
              </section>
              <section className='share-options'>
                <div className='title'>Compartilhe esta postagem</div>
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
                <Image
                  width={150}
                  height={150}
                  src={author.picture}
                  alt='article author photo'
                />
                <div>
                  <h3>{author.name}</h3>
                  <span className='description'>{author.description}</span>
                </div>
              </section>
            </section>

            <Comments post={post} />

            <section className='featured-posts-container'>
              <h2>
                <strong>Últimas postagens</strong>
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
                        <Image
                          width={300}
                          height={210}
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
                            {post.excerpt.length > 200
                              ? `${post.excerpt.slice(0, 210) + '...'}`
                              : post.excerpt}
                          </p>

                          <button
                            onClick={() => router.push(`/post/${post.slug}`)}>
                            <IoOpenOutline />
                            <span>Continuar a leitura</span>
                          </button>
                        </div>
                      </>
                    </Link>
                  ))}
              </div>
            </section>
          </article>
          <NewsLetter />
        </div>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await getPaths();
  return {
    paths: slugs,
    fallback: false
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const [post, latestPosts] = (
      await Promise.all([getPost(slug), getPosts({ limit: 3, offset: 0 })])
    ).map((res) => res.data);
    return { props: { post, latestPosts }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
