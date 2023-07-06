import {
  IoAdd,
  IoDownloadOutline,
  IoEllipsisHorizontal,
  IoHeart,
  IoPushOutline,
  IoTrashOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import fetch from '@/config/client';
import { FaAd } from 'react-icons/fa';
import Compressor from 'compressorjs';
import { AxiosResponse } from 'axios';
import { actions } from '@/data/actions';
import { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import { complements } from '@/data/app-data';
import { GetServerSidePropsContext } from 'next';
import { IPublicStory, TStory } from '@/../@types';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { BsChatSquareTextFill } from 'react-icons/bs';
import { DefaultTheme, useTheme } from 'styled-components';
import { StoryContainer as Container } from '@/styles/modules/story';

interface IProps {
  story: IPublicStory | undefined;
}

export default function Story(props: IProps): JSX.Element {
  const theme: DefaultTheme = useTheme();
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    status: boolean;
    msg: string;
  }>({ status: false, msg: '' });

  const [coverImageFile, setCoverImageFile] = useState<FileList | null>(null);

  const [coverImageData, setCoverImageData] = useState({
    id: '',
    data: '',
  });

  function handleCoverImageFile(): void {
    const imageData: File | null | undefined = coverImageFile?.item(0);
    if (imageData) {
      new Compressor(imageData, {
        quality: 0.8,
        width: 420,
        height: 220,
        resize: 'cover',
        success: (compressedImge: File | Blob): void => {
          const reader = new FileReader();
          reader.readAsDataURL(compressedImge);
          reader.onloadend = function (e: ProgressEvent<FileReader>): void {
            const encodedImage: string = e.target?.result as string;
            setCoverImageData({
              id: state.story.cover_image?.id || '',
              data: encodedImage,
            });
          };
        },
      });
    }
  }

  async function deleteCoverImage(): Promise<void> {
    if (!state.story.cover_image?.url)
      return setCoverImageData({ id: '', data: '' });

    try {
      setLoading(true);
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/stories/assets/${props.story?._id}`,
        data: { assetId: props.story?.cover_image?.id },
      });

      setCoverImageData({ id: '', data: '' });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: {
            ...state.story,
            cover_image: { id: '', url: '' },
          },
        },
      });
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function createStory(): Promise<void> {
    setLoading(true);
    try {
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/stories`,
        data: { ...state.story, coverImageData },
      });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: {
            title: '',
            allow_comments: true,
            content: '',
            cover_image: { id: '', url: '' },
          },
        },
      });
      setCoverImageData({ id: '', data: '' });
      setCoverImageFile(null);
      router.back();
    } catch (error: any) {
      console.error(error.response?.data?.message || error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  async function updateStory(): Promise<void> {
    setLoading(true);
    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/stories/${props.story?._id}`,
        data: { ...state.story },
      });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: {
            title: '',
            allow_comments: true,
            content: '',
            cover_image: { id: '', url: '' },
          },
        },
      });
    } catch (error: any) {
      console.error(error.response?.data?.message || error);
      setError({
        status: true,
        msg:
          error?.response?.data?.message ||
          'Oops! Algo deu errado. Tente novamente.',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (props.story && Object.values(props.story).length > 0) {
      dispatch({
        type: actions.USER_STORY,
        payload: { ...state, story: { ...props.story } },
      });
    }

    return () => {
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: {
            title: '',
            allow_comments: true,
            content: '',
            cover_image: { id: '', url: '' },
          },
        },
      });
    };
  }, []);

  useEffect((): (() => void) => {
    handleCoverImageFile();
    return () => {
      setCoverImageData({ id: '', data: '' });
      setCoverImageFile(null);
    };
  }, [coverImageFile]);

  useEffect((): (() => void) => {
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
    <Layout metadata={{ title: `${complements.defaultTitle} | Histórias` }}>
      <Container>
        <div className='wrapper-container'>
          <aside>
            <section className='no-ads'>
              <FaAd className='ads-icon' />
              <h3>
                <span>Espaço reservado para anúncios</span>
              </h3>
              <Link href={`/users/dashboard/create-ad`}>
                <IoAdd />
                <span>Criar anúncio</span>
              </Link>
            </section>
          </aside>

          <article>
            <section className='header-container'>
              <h2>
                <IoHeart />
                <span>
                  {props.story?._id
                    ? 'Atualização de História'
                    : 'Nova História'}
                </span>
              </h2>
              <p>
                Escreva uma pequena história relacionada aos produtos que vende
                ou para compartilhar conhecimentos com a comunidade.
              </p>
              <p>
                Por favor, seja educado ao escrever as suas histórias e respeite
                o nosso{' '}
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
                      onChange={(e): void =>
                        state.story.title.length > 64
                          ? undefined
                          : dispatch({
                              type: actions.USER_STORY,
                              payload: {
                                ...state,
                                story: {
                                  ...state.story,
                                  title: String(e.target.value),
                                },
                              },
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
                      onChange={(e): void =>
                        state.story.content.length > 512
                          ? undefined
                          : dispatch({
                              type: actions.USER_STORY,
                              payload: {
                                ...state,
                                story: {
                                  ...state.story,
                                  content: String(e.target.value),
                                },
                              },
                            })
                      }
                      value={state.story.content}
                    />
                    <span className='counter'>{`${
                      state.story.content.length || 0
                    } / 512`}</span>
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element check-box'>
                    <label htmlFor='allow_comments'>
                      <BsChatSquareTextFill />
                      <span>Permitir comentários?</span>
                    </label>
                    <input
                      type='checkbox'
                      id='allow_comments'
                      name='allow_comments'
                      onChange={(e): void => {
                        dispatch({
                          type: actions.USER_STORY,
                          payload: {
                            ...state,
                            story: {
                              ...state.story,
                              allow_comments: e.target.checked,
                            },
                          },
                        });
                      }}
                      checked={state.story.allow_comments}
                    />
                  </div>
                </section>

                <div className='cover-image-container'>
                  {coverImageData.data ? (
                    <>
                      <Image
                        width={420}
                        height={220}
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
                        <IoTrashOutline />
                        <span>Remover imagem</span>
                      </button>
                    </>
                  ) : state.story.cover_image && state.story.cover_image.url ? (
                    <>
                      <Image
                        width={420}
                        height={220}
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
                        <IoTrashOutline />
                      </button>
                    </>
                  ) : (
                    <div
                      className='image-drop-container'
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        console.log(e);
                        const dataTypes = [
                          'image/png',
                          'image/jpeg',
                          'image/jpg',
                        ];
                      }}>
                      <div className='content'>
                        <IoDownloadOutline className='download-icon' />
                        <h3>
                          <span>
                            Carregue uma imagem ou arraste e solte aqui
                          </span>
                        </h3>
                        <span className='description'>
                          Dimensões: 420 x 220 pixels.
                        </span>

                        <input
                          type='file'
                          id='cover'
                          name='cover'
                          accept='.jpg, .jpeg, .png'
                          multiple={false}
                          onChange={(e) => setCoverImageFile(e.target.files)}
                        />
                        <label
                          htmlFor='cover'
                          title='Selecionar imagem para a história'>
                          <span>Carregar imagem</span>
                          <IoAdd />
                        </label>
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
                          display: 'block',
                        }}
                      />
                      <span>Processando...</span>
                    </div>
                  )}

                  {!loading && !error.status && (
                    <div className='prompt-actions'>
                      {props.story?._id !== undefined ? (
                        <button onClick={updateStory} className='prompt-accept'>
                          <IoPushOutline />
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button
                          className='prompt-accept-btn'
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

type TContext = GetServerSidePropsContext;

export async function getServerSideProps(context: TContext) {
  try {
    if (!context.params?.slug || context.params?.slug === 'create-story')
      return { props: {} };

    const { data } = await fetch<AxiosResponse<TStory>>({
      method: 'get',
      url: `/api/users/stories/${context.params.slug}`,
    });
    return { props: { story: { ...data } } };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
}
