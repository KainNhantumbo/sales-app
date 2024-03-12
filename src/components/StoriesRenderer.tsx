import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { constants } from '@/data/constants';
import { actions } from '@/shared/actions';
import { _storiesRender as Container } from '@/styles/modules/stories-renderer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { BiUser } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import {
  IoBanOutline,
  IoHeart,
  IoHeartOutline,
  IoLeafOutline,
  IoReload
} from 'react-icons/io5';
import { useInView } from 'react-intersection-observer';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { HttpError, PublicStory } from '../types';
import {DeleteStoryPrompt} from './modals/DeleteStoryPrompt';

interface Props {
  userId?: string | undefined;
  favoritesId?: string | undefined;
}

export function StoriesRenderer(props: Props) {
  const { state, dispatch, httpClient, deleteStoryPromptController } = useAppContext();
  const { requestLogin } = useModulesContext();
  const LIMIT: number = 8;
  const router = useRouter();
  const theme = useTheme();
  const { ref, inView } = useInView();

  const getStories = async ({
    pageParam = 0
  }): Promise<{ data: PublicStory[]; currentOffset: number }> => {
    const { data } = await fetch<PublicStory[]>({
      method: 'get',
      url: `/api/v1/users/stories${props.userId ? `?userId=${props.userId}` : ''}${
        props.favoritesId
          ? props.userId
            ? `&favoritesId=${props.favoritesId}`
            : `?favoritesId=${props.favoritesId}`
          : ''
      }${state.searchStories ? `?search=${state.searchStories}` : ''}`
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, fetchNextPage, hasNextPage, refetch, isLoading, isError } =
    useInfiniteQuery({
      queryKey: ['user-stories'],
      queryFn: getStories,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined
    });

  const handleDeleteStory = async (storeId: string) => {
    try {
      await httpClient({
        method: 'delete',
        url: `/api/v1/users/stories/${storeId}`
      });
      deleteStoryPromptController(false, '');
      refetch({ queryKey: ['user-stories'] });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
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
          publicStories: [
            ...state.publicStories.map((story) =>
              story._id === storyId ? { ...story, favorites: data } : story
            )
          ]
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
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
          publicStories: [
            ...state.publicStories.map((story) =>
              story._id === storyId ? { ...story, favorites: data } : story
            )
          ]
        }
      });
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  useEffect(() => {
    if (data) {
      const reducedStories = data?.pages
        .map((page) => {
          return page.data;
        })
        .reduce((accumulator, currentObj) => [...accumulator, ...currentObj]);

      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: {
          ...state,
          publicStories: [...reducedStories]
        }
      });
    }

    return () => {
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: { ...state, publicStories: [] }
      });
    };
  }, [data]);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      refetch({ queryKey: ['user-stories'] });
    }, 400);
    return () => clearTimeout(debounceTime);
  }, [state.searchStories]);

  return (
    <Container>
      <DeleteStoryPrompt deleteFn={handleDeleteStory} />

      {state.publicStories.length < 1 && !isLoading && !isError ? (
        <div className='empty-data_container'>
          <section className='content'>
            <IoLeafOutline />
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
            state.publicStories.map((story, index) => (
              <div
                key={String(story._id)}
                className='story-container'
                ref={state.publicStories.length === index + 1 ? ref : undefined}>
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
                      .map((phrase, index) => <p key={String(index)}>{phrase}</p>)
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
                        <FaEdit />
                        <span>Editar</span>
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.8 }}
                        onClick={() => deleteStoryPromptController(true, story._id)}>
                        <BsTrash />
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
                            <IoHeart />
                            <span>Apoiado</span>
                          </>
                        ) : (
                          <>
                            <IoHeartOutline />
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
                        <IoBanOutline />
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
              <IoReload />
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
