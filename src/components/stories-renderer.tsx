import client from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { _storiesRender as Container } from '@/styles/modules/stories-renderer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as React from 'react';
import { BiUser } from 'react-icons/bi';
import * as Io from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';
import type { HttpError, PublicStory } from '../types';

type Props = { userId?: string; favoritesId?: string };

export function StoriesRenderer(props: Props) {
  const { state, dispatch, httpClient } = useAppContext();
  const { requestLogin } = useModulesContext();
  const LIMIT: number = 8;
  const router = useRouter();
  const theme = useTheme();
  const { ref, inView } = useInView();

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['user-stories'],
      queryFn: async ({ pageParam = 0 }) => {
        const query = new URLSearchParams({
          userId: props.userId || '',
          favoritesId: props.favoritesId || '',
          search: state.searchStories
        });
        try {
          const { data } = await client.get<PublicStory[]>(
            `/api/v1/users/stories?${query.toString()}`
          );
          return { data, currentOffset: pageParam + 1 };
        } catch (error) {
          const { message } = errorTransformer(error as HttpError);
          toast.error(message);
          console.error(error);
          return { data: [], currentOffset: 0 };
        }
      },
      getNextPageParam: ({ data, currentOffset }) =>
        data?.length >= LIMIT ? currentOffset : undefined
    });

  const onDelete = (storeId: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          ...state.prompt,
          status: true,
          title: 'Eliminação de História',
          message:
            'Você realmente gostaria de eliminar esta história? Esta ação não pode ser desfeita.',
          actionButtonMessage: 'Confirmar',
          handleFunction: async () => {
            try {
              await httpClient({
                method: 'delete',
                url: `/api/v1/users/stories/${storeId}`
              });
              refetch({ queryKey: ['user-stories'] });
            } catch (error) {
              const { message } = errorTransformer(error as HttpError);
              toast.error(message);
              console.error(error);
            } finally {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
            }
          }
        }
      }
    });
  };

  const handleFavoriteStory = async (storyId: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/stories/${storyId}`
      });
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: {
          ...state,
          publicStories: state.publicStories.map((story) =>
            story._id === storyId ? { ...story, favorites: data } : story
          )
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    }
  };

  const handleUnFavoriteStory = async (storyId: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/stories/${storyId}`
      });
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: {
          ...state,
          publicStories: state.publicStories.map((story) =>
            story._id === storyId ? { ...story, favorites: data } : story
          )
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    }
  };

  const stories = React.useMemo(() => {
    if (data) {
      return data.pages.map(({ data }) => data).reduce((acc, curr) => [...acc, ...curr]);
    }
    return [];
  }, [data]);

  React.useEffect(() => {
    dispatch({
      type: actions.PUBLIC_USER_STORIES,
      payload: { ...state, publicStories: [...stories] }
    });
  }, [stories]);

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  React.useEffect(() => {
    const instance = setTimeout(() => {
      refetch({ queryKey: ['user-stories'] });
    }, 400);
    return () => clearTimeout(instance);
  }, [state.searchStories]);

  return (
    <Container>
      {state.publicStories.length < 1 && !isLoading && !isError ? (
        <div className='empty-data_container'>
          <section className='content'>
            <Io.IoLeafOutline />
            <h3>
              <span>Nenhuma história para mostrar</span>
            </h3>
            {state.searchStories.length > 0 ? (
              <p>A sua pesquisa não teve resultados. Tente um termo diferente.</p>
            ) : (
              <p>Crie algumas histórias para começar.</p>
            )}
          </section>
        </div>
      ) : null}

      {state.publicStories.length > 0 ? (
        <section className='stories-container'>
          {state.publicStories.length > 0 &&
            state.publicStories.map((story, i) => (
              <div
                key={story._id}
                className='story-container'
                ref={state.publicStories.length === i + 1 ? ref : undefined}>
                <div className='header-container'>
                  <div
                    className='profile-image-container'
                    title={`Visitar o perfil de ${story.created_by.first_name} ${story.created_by.last_name}`}
                    onClick={() =>
                      !router.asPath.includes(story.created_by._id) &&
                      router.push(`/community/profile/${story.created_by._id}`)
                    }>
                    {story.created_by.profile_image &&
                    story.created_by.profile_image?.url ? (
                      <Image
                        width={220}
                        height={220}
                        className='profile-image'
                        src={story.created_by.profile_image.url}
                        aria-label={`Imagem de perfil de ${story.created_by.first_name} ${story.created_by.last_name}`}
                        alt={`Imagem de perfil de ${story.created_by.first_name} ${story.created_by.last_name}`}
                      />
                    ) : (
                      <BiUser className='no-image-icon' />
                    )}
                  </div>
                  <div className='details-container'>
                    <h3 className='author-name'>
                      <span>{`${story.created_by.first_name} ${story.created_by.last_name}`}</span>
                    </h3>
                    <h5 className='time'>
                      <span>{moment(story.updatedAt).format('LLL')}</span>
                    </h5>
                  </div>
                </div>
                <h3 className='title'>
                  <span>{story.title}</span>
                </h3>
                <div className='content-container'>
                  {story.content.includes('\n') ? (
                    story.content
                      .split('\n')
                      .map((phrase, i) => <p key={String(i)}>{phrase}</p>)
                  ) : (
                    <p>{story.content}</p>
                  )}
                </div>
                {story?.cover_image && story.cover_image.url && (
                  <Image
                    width={420}
                    height={220}
                    className='cover-image'
                    src={story.cover_image.url}
                    title={`Imagem de capa de ${story.title}`}
                    aria-label={`Imagem de capa de ${story.title}`}
                    alt={`Imagem de capa de ${story.title}`}
                  />
                )}

                <div className='information-container'>
                  <p>Apoiado por {story.favorites.length} pessoas</p>
                </div>

                <section className='actions-container'>
                  {story.created_by._id === state.auth.id ? (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => router.push(`/community/story/${story._id}`)}>
                        <Io.IoPencilOutline />
                        <span>Editar</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => onDelete(story._id)}>
                        <Io.IoTrashOutline />
                        <span>Apagar</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        disabled={!state.auth.id && true}
                        onClick={() => {
                          if (!state.auth.token) return requestLogin();

                          story.favorites.includes(state.auth.id)
                            ? handleUnFavoriteStory(story._id)
                            : handleFavoriteStory(story._id);
                        }}>
                        {story.favorites.includes(state.auth.id) ? (
                          <>
                            <Io.IoHeart />
                            <span>Apoiado</span>
                          </>
                        ) : (
                          <>
                            <Io.IoHeartOutline />
                            <span>Apoiar</span>
                          </>
                        )}
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() =>
                          router.push(
                            `/denounce?url=${constants.websiteUrl.concat(
                              router.asPath
                            )}&type=story&id=${story._id}`
                          )
                        }>
                        <Io.IoBanOutline />
                        <span>Denunciar</span>
                      </motion.button>
                    </>
                  )}
                </section>
              </div>
            ))}
        </section>
      ) : null}

      <div className='stats-container'>
        {isError && !isLoading ? (
          <div className=' fetch-error-message '>
            <h3>Erro ao carregar dados.</h3>
            <button onClick={() => fetchNextPage()}>
              <Io.IoReload />
              <span>Tentar novamente</span>
            </button>
          </div>
        ) : null}

        {isLoading && !isError ? (
          <div className='loading'>
            <PulseLoader
              size={20}
              color={`rgb(${theme.primary_shade})`}
              aria-placeholder='Processando...'
              cssOverride={{
                display: 'block'
              }}
            />
          </div>
        ) : null}

        {!hasNextPage && !isLoading && !isError && state.publicStories.length > 0 && (
          <p>Chegou ao fim</p>
        )}
      </div>
    </Container>
  );
}
