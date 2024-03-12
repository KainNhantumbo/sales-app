import Layout from '@/components/layout';
import { SideBarAds } from '@/components/sidebar-ads';
import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { DEFAULT_ERROR_MESSAGE, constants } from '@/data/constants';
import { actions } from '@/shared/actions';
import { _story as Container } from '@/styles/common/story';
import { HttpError, PublicStory, Story } from '@/types';
import { AxiosResponse } from 'axios';
import Compressor from 'compressorjs';
import { GetServerSidePropsContext } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Router, useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { BsTrash } from 'react-icons/bs';
import { IoDownloadOutline, IoEllipsisHorizontal, IoHeart } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

type Props = { story: PublicStory | undefined };
type TError = { status: boolean; msg: string };

export default function Page(props: Props) {
  const theme = useTheme();
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<TError>({ status: false, msg: '' });

  const [coverImageData, setCoverImageData] = useState({
    id: state.story.cover_image?.id || '',
    data: state.story.cover_image?.url || ''
  });

  const acceptedMimeTypes: string[] = ['image/png', 'image/jpeg', 'image/jpg'];

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 1,
    onDrop: useCallback(<T extends File>(acceptedFiles: T[]) => {
      const file = acceptedFiles[0];
      if (!file || !acceptedMimeTypes.includes(String(file.type))) return undefined;
      new Compressor(file, {
        quality: 0.8,
        width: 420,
        height: 220,
        resize: 'cover',
        success: (compressedImge: File | Blob) => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>) {
            const encodedImage: string = e.target?.result as string;
            setCoverImageData({
              id: state.story.cover_image?.id || '',
              data: encodedImage
            });
          };
        }
      });
    }, [])
  });

  async function deleteCoverImage() {
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
          story: {
            ...state.story,
            cover_image: { id: '', url: '' }
          }
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
      setError({
        status: true,
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          DEFAULT_ERROR_MESSAGE
      });
    } finally {
      setLoading(false);
    }
  }

  async function createStory() {
    setLoading(true);
    try {
      await httpClient({
        method: 'post',
        url: `/api/v1/users/stories`,
        data: { ...state.story, coverImageData }
      });
      router.back();
    } catch (error) {
      console.error((error as HttpError).response?.data?.message || error);
      setError({
        status: true,
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          DEFAULT_ERROR_MESSAGE
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateStory() {
    setLoading(true);
    try {
      await httpClient({
        method: 'patch',
        url: `/api/v1/users/stories/${props.story?._id}`,
        data: { ...state.story, coverImageData }
      });
      router.back();
    } catch (error) {
      console.error((error as HttpError).response?.data?.message || error);
      setError({
        status: true,
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          DEFAULT_ERROR_MESSAGE
      });
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

    Router.events.on('routeChangeStart', function () {
      setLoading(true);
    });
    Router.events.on('routeChangeComplete', function () {
      setLoading(false);
    });

    return () => {
      Router.events.off('routeChangeStart', function () {
        setLoading(false);
      });
      Router.events.off('routeChangeComplete', function () {
        setLoading(false);
      });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: {
            title: '',
            content: '',
            cover_image: { id: '', url: '' }
          }
        }
      });
      setCoverImageData({ id: '', data: '' });
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (error.status) {
        setError({ status: false, msg: '' });
      }
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [error.status]);

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
                            story: {
                              ...state.story,
                              title: String(e.target.value)
                            }
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
                            story: {
                              ...state.story,
                              content: String(e.target.value)
                            }
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
                        onClick={deleteCoverImage}>
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
                        onClick={deleteCoverImage}>
                        <BsTrash />
                        <span>Remover imagem</span>
                      </button>
                    </>
                  ) : (
                    <div {...getRootProps()} className='image-drop-container'>
                      <div className='content'>
                        <IoDownloadOutline
                          className={
                            isDragActive ? 'download-icon active-mode' : 'download-icon'
                          }
                        />
                        <h3>
                          {isDragActive ? (
                            <span>Solte a imagem aqui</span>
                          ) : (
                            <span>Arraste e solte a imagem ou clique para carregar</span>
                          )}
                        </h3>
                        <span className='description'>
                          Dimensões: 420 x 220 pixels [.JPEG, .JPG, .PNG].
                        </span>

                        <input {...getInputProps()} />
                      </div>
                    </div>
                  )}
                </div>

                <section className='actions-container'>
                  {error.status && !loading && (
                    <h3 className='error-message'>{error.msg}</h3>
                  )}

                  {loading && !error.status && (
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

                  {!loading && !error.status && (
                    <div className='prompt-actions'>
                      {props.story?._id !== undefined ? (
                        <button
                          onClick={updateStory}
                          disabled={loading}
                          className='prompt-accept'>
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button
                          className='prompt-accept-btn'
                          disabled={loading}
                          onClick={createStory}>
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
