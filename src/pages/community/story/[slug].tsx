import { DropzoneArea } from '@/components/dropzone';
import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { useFetchState } from '@/hooks/use-fetch-state';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { _story as Container } from '@/styles/common/story';
import { HttpError, PublicStory, Story } from '@/types';
import type { AxiosResponse } from 'axios';
import type { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoEllipsisHorizontal, IoHeart } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

type Props = { story?: PublicStory };

export default function Page(props: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();
  const { isLoading, setLoading } = useFetchState({ delay: 500 });

  const [coverImageData, setCoverImageData] = useState({
    id: state.story.cover_image?.id || '',
    data: state.story.cover_image?.url || ''
  });

  async function onDeleteCoverImage() {
    if (!state.story.cover_image?.url) return setCoverImageData({ id: '', data: '' });

    try {
      setLoading(true);
      await httpClient({
        method: 'delete',
        url: `/api/v1/users/stories/assets/${props.story?._id}`,
        data: { assetId: props.story?.cover_image?.id }
      });

      setCoverImageData({ id: '', data: '' });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: { ...state.story, cover_image: { id: '', url: '' } }
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onCreate() {
    setLoading(true);
    try {
      await httpClient({
        method: 'post',
        url: `/api/v1/users/stories`,
        data: { ...state.story, coverImageData }
      });
      router.back();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function onUpdate() {
    setLoading(true);
    try {
      await httpClient({
        method: 'patch',
        url: `/api/v1/users/stories/${props.story?._id}`,
        data: { ...state.story, coverImageData }
      });
      router.back();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (props.story && Object.values(props.story).length > 0) {
      dispatch({
        type: actions.USER_STORY,
        payload: { ...state, story: { ...props.story } }
      });
    }
    return () => {
      dispatch({
        type: actions.USER_STORY,
        payload: { ...state, story: initialState.story }
      });
      setCoverImageData({ id: '', data: '' });
    };
  }, [props.story]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Histórias` }}>
      <Container>
        <div className='wrapper-container'>
          <SideBarAds key={'story'} />

          <article>
            <section className='header-container'>
              <h2>
                <IoHeart />
                <span>
                  {props.story?._id ? 'Atualização de História' : 'Nova História'}
                </span>
              </h2>
              <p>
                Escreva uma pequena história relacionada aos produtos que vende ou para
                compartilhar conhecimentos com a comunidade.
              </p>
              <p>
                Por favor, seja educado ao escrever as suas histórias e respeite o nosso{' '}
                <Link href={'/legal/code-of-conduct'}>
                  <span>código de conduta</span>
                </Link>{' '}
                e os nossos{' '}
                <Link href={'/legal/terms-of-use'}>
                  <span>termos e condições</span>
                </Link>
                .
              </p>
            </section>
            <section className='form-container'>
              <section className='form' spellCheck={'true'}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='title'>
                      <IoEllipsisHorizontal />
                      <span>Título *</span>
                    </label>
                    <input
                      type='text'
                      id='title'
                      placeholder='Título da sua história'
                      aria-label='Título da sua história'
                      required={true}
                      maxLength={64}
                      onChange={(e) =>
                        dispatch({
                          type: actions.USER_STORY,
                          payload: {
                            ...state,
                            story: { ...state.story, title: String(e.target.value) }
                          }
                        })
                      }
                      value={state.story.title}
                    />
                    <span className='counter'>{`${
                      state.story.title.length || 0
                    } / 64`}</span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='description'>
                      <IoEllipsisHorizontal />
                      <span>Conteúdo *</span>
                    </label>
                    <textarea
                      id='description'
                      placeholder='Conteúdo da história'
                      aria-label='Conteúdo da história'
                      rows={6}
                      maxLength={512}
                      onChange={(e) =>
                        dispatch({
                          type: actions.USER_STORY,
                          payload: {
                            ...state,
                            story: { ...state.story, content: String(e.target.value) }
                          }
                        })
                      }
                      value={state.story.content}
                    />
                    <span className='counter'>{`${
                      state.story.content.length || 0
                    } / 512`}</span>
                  </div>
                </section>

                <div className='cover-image-container'>
                  {coverImageData.data ? (
                    <>
                      <Image
                        width={420}
                        height={220}
                        priority
                        className='cover-image'
                        src={coverImageData.data}
                        title={`Imagem de capa da história`}
                        aria-label={`Imagem de capa da história`}
                        alt={`Imagem de capa da história`}
                      />
                      <button
                        title='Apagar imagem de capa'
                        className='clear-image'
                        onClick={onDeleteCoverImage}>
                        <BsTrash />
                        <span>Remover imagem</span>
                      </button>
                    </>
                  ) : state.story.cover_image && state.story.cover_image.url ? (
                    <>
                      <Image
                        width={420}
                        height={220}
                        priority
                        className='cover-image'
                        src={state.story.cover_image.url}
                        title={`Imagem de capa da história`}
                        aria-label={`Imagem de capa da história`}
                        alt={`Imagem de capa da história`}
                      />
                      <button
                        title='Apagar imagem de capa'
                        className='clear-image'
                        onClick={onDeleteCoverImage}>
                        <BsTrash />
                        <span>Remover imagem</span>
                      </button>
                    </>
                  ) : (
                    <div className='image-drop-container'>
                      <DropzoneArea
                        width={220}
                        height={420}
                        handler={(encodedImage) => {
                          setCoverImageData({
                            id: state.story.cover_image?.id || '',
                            data: encodedImage
                          });
                        }}
                      />
                    </div>
                  )}
                </div>

                <section className='actions-container'>
                  {isLoading && (
                    <div className='loading'>
                      <PulseLoader
                        color={`rgb(${theme.primary})`}
                        aria-placeholder='Processando...'
                        cssOverride={{
                          display: 'block'
                        }}
                      />
                      <span>Processando...</span>
                    </div>
                  )}

                  {!isLoading && (
                    <div className='prompt-actions'>
                      {props.story?._id !== undefined ? (
                        <button
                          onClick={onUpdate}
                          disabled={isLoading}
                          className='prompt-accept'>
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button
                          className='prompt-accept-btn'
                          disabled={isLoading}
                          onClick={onCreate}>
                          <span>Publicar</span>
                        </button>
                      )}
                    </div>
                  )}
                </section>
              </section>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}

type Context = GetServerSidePropsContext;

export async function getServerSideProps(context: Context) {
  try {
    if (context.params?.slug === 'create-story') return { props: {} };
    const { data } = await fetch<AxiosResponse<Story>>({
      method: 'get',
      url: `/api/v1/users/stories/${context.params?.slug}`
    });
    return { props: { story: { ...data } } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
