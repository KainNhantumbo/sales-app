import {
  IoIosAlbums,
  IoIosBookmark,
  IoMdCalendar,
  IoMdTime,
} from 'react-icons/io';
import { IoChatbubbleEllipsesOutline, IoOpenOutline } from 'react-icons/io5';
import moment from 'moment';
import Link from 'next/link';
import Image from 'next/image';
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
import { useAppContext } from '@/context/AppContext';
import { BiUser } from 'react-icons/bi';
import { actions } from '@/data/reducer-actions';
import { useState, useEffect } from 'react';
import { BounceLoader, MoonLoader, PulseLoader } from 'react-spinners';

interface IPost {
  post: IBlogPost;
  latestPosts: IBlogPosts[];
}

export default function Post({ post, latestPosts }: IPost): JSX.Element {
  const router = useRouter();
  const theme = useTheme();
  const { state, dispatch } = useAppContext();

  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'create-comment' | 'user-update';
  }>({ status: false, key: 'create-comment' });

  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'create-comment' | 'user-update';
  }>({ status: false, msg: '', key: 'create-comment' });

  const readingProps = readingTime(
    post.content.concat(post.excerpt),
    undefined,
    'pt-br'
  );

  const shareMedia = shareUrls({
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt,
    hostname: complements.websiteUrl,
  });

  // ---------------functions----------------

  async function handleCreateComment() {
    setLoading({ status: true, key: 'create-comment' });
    try {
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
      setError({
        status: true,
        key: 'create-comment',
        msg: err.response?.data?.message || 'Erro: por favor, tente novamente.',
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  }

  async function handleUpdateComment(id: string) {}
  async function handledeleteComment(id: string) {}

  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, msg: '', key: 'create-comment' });
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

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
                <Image src={author.picture} alt='article author photo' />
                <div>
                  <h3>{author.name}</h3>
                  <span className='description'>{author.description}</span>
                </div>
              </section>
            </section>

            {/* comments */}
            <section className='comments-section'>
              <section className='title'>
                <h2>
                  <IoChatbubbleEllipsesOutline />
                  <span>Comentários</span>
                  <span>• {state.commentsList.length}</span>
                </h2>
              </section>

              <section className='comments-wrapper'>
                <section className='current-comment'>
                  <div className='comment-swapper'>
                    {state.userAuth.profile_image && (
                      <img
                        src={state.userAuth.profile_image}
                        alt='current user profile picture'
                      />
                    )}
                    {!state.userAuth.profile_image && <BiUser />}
                    <textarea
                      placeholder='Adicionar comentário...'
                      name='current-commet'
                      value={state.comment.content}
                      rows={5}
                      onChange={(e): void => {
                        dispatch({
                          type: actions.CREATE_COMMENT,
                          payload: {
                            ...state,
                            comment: {
                              ...state.comment,
                              content: e.target.value,
                            },
                          },
                        });
                      }}
                    />
                  </div>

                  {!loading.status &&
                    error.status &&
                    error.key === 'create-comment' && (
                      <span className='error-message'>{error.msg}</span>
                    )}
                  {loading.status && !error.status && (
                    <div className='loader'>
                      <MoonLoader
                      size={30}
                        color={`rgb(${theme.primary_variant})`}
                        cssOverride={{
                          display: 'block',
                          margin: '0 auto',
                        }}
                      />
                    </div>
                  )}
                  {!loading.status && !error.status && (
                    <button
                      disabled={loading.status || (error.status && true)}
                      onClick={handleCreateComment}>
                      <span>Enviar</span>
                    </button>
                  )}
                </section>
                <section className='comments-container'></section>
              </section>
            </section>

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
                            <span>Continuar a leitura</span>
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
