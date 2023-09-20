import {
  IoIosAlbums,
  IoIosBookmark,
  IoMdCalendar,
  IoMdTime,
} from 'react-icons/io';
import {
  IoChatbubblesOutline,
  IoHeart,
  IoHeartOutline,
  IoOpenOutline,
} from 'react-icons/io5';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { NextPage } from 'next';
import { motion } from 'framer-motion';
import { formatDate } from '@/lib/utils';
import editorJsHtml from 'editorjs-html';
import Layout from '@/components/Layout';
import ErrorPage from '@/pages/error-page';
import NewsLetter from '@/components/Newsletter';
import { useRouter } from 'next/router';
import { readingTime } from 'reading-time-estimator';
import { useAppContext } from '@/context/AppContext';
import { DefaultTheme, useTheme } from 'styled-components';
import { getPaths, getPost, getPosts } from '@/lib/queries';
import { CommentCount, DiscussionEmbed } from 'disqus-react';
import type { IBlogPost, IBlogPosts } from '../../../types/index';
import { _post as Container } from '@/styles/common/post';
import EditorJsRenderer from '@/components/EditorJSRenderer';
import type { TParsedContent } from '@/components/EditorJSRenderer';
import { author, complements, shareUrlPaths } from '@/shared/data';

interface IPost {
  post: IBlogPost;
  latestPosts: IBlogPosts[];
}

const Post: NextPage<IPost> = ({ post: initialPost, latestPosts }) => {
  const { state, useFetchAPI, loginPromptController } = useAppContext();
  const [post, setPost] = useState(initialPost);
  const router = useRouter();
  const theme: DefaultTheme = useTheme();

  if (!initialPost) {
    return <ErrorPage retryFn={router.reload} />;
  }

  const EditorJsToHtml = editorJsHtml();
  const postContent = EditorJsToHtml.parse(post.content) as TParsedContent[];

  const readingProps = readingTime(
    String.prototype.concat(post.excerpt, postContent as unknown as string),
    undefined,
    'pt-br'
  );

  const shareMedia = shareUrlPaths({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    hostname: complements.websiteUrl,
  });

  const handleFavoritePost = async () => {
    try {
      const { data } = await useFetchAPI<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/blog-posts/${post._id}`,
      });
      setPost((doc) => ({ ...doc, favorites: data }));
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  const handleUnFavoritePost = async () => {
    try {
      const { data } = await useFetchAPI<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/blog-posts/${post._id}`,
      });
      setPost((doc) => ({ ...doc, favorites: data }));
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

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
                    height={30}
                    src={author.picture as any}
                    alt='article author photo'
                  />
                  <span>{author.name}</span>
                </div>
                <div className='share-options'>
                  <div className='title'>Compartilhe:</div>
                  <div className='options'>
                    {shareMedia.map((option, index) => (
                      <motion.a
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                        href={option.url}
                        title={option.name}
                        aria-label={option.name}
                        target={'_blank'}
                        rel={'noreferrer noopener'}
                        key={String(index)}>
                        {<option.icon />}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </section>
              <section className='reading-props'>
                <div>
                  <IoIosAlbums />
                  <span style={{ color: `rgb(${theme.primary_shade})` }}>
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
                  <span>
                    <CommentCount
                      shortname={'shopping-tree'}
                      config={{
                        identifier: post._id,
                        url: router.asPath,
                        title: post.title,
                      }}
                    />
                    comentários
                  </span>
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

            <section className='content'>
              <EditorJsRenderer data={post.content} />
            </section>

            <section className='base-container'>
              <section className='favorites-wrapper'>
                <h2>
                  <span>Gostou da postagem?</span>
                </h2>
                <div>
                  <button
                    onClick={() => {
                      if (!state.auth.token) return loginPromptController();

                      post.favorites.includes(state.auth.id)
                        ? handleUnFavoritePost()
                        : handleFavoritePost();
                    }}>
                    {post.favorites.includes(state.auth.id) ? (
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

            <DiscussionEmbed
              shortname={complements.disqusName}
              config={{
                identifier: post._id,
                url: router.asPath,
                title: post.title,
                language: 'pt_BR',
              }}
            />

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
};

export default Post;

export async function getStaticPaths(): Promise<any> {
  const slugs = await getPaths();
  return {
    paths: slugs,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const [post, latestPosts] = (
      await Promise.all([getPost(slug), getPosts({ limit: 3, offset: 0 })])
    ).map((res) => res.data);
    return { props: { post, latestPosts }, revalidate: 30 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
