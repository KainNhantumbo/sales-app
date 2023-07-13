import moment from 'moment';
import Image from 'next/image';
import { NextPage } from 'next';
import fetch from '@/config/client';
import { BiUser } from 'react-icons/bi';
import { actions } from '@/data/actions';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { complements } from '@/data/app-data';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  IoBanOutline,
  IoGridOutline,
  IoHeart,
  IoHeartOutline,
  IoLeafOutline,
  IoReload,
} from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { IPublicStory, TPublicStoreList } from '@/../@types';
import { NextRouter, useRouter } from 'next/router';
import DeleteStoryPrompt from './modals/DeleteStoryPrompt';
import { StoriesRenderContainer as Container } from '@/styles/modules/stories-renderer';
import { InViewHookResponse, useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from '@tanstack/react-query';
import { PulseLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';

interface IProps {
  userId?: string | undefined;
  favoritesId?: string | undefined;
}

const StoriesRenderer: NextPage<IProps> = (props): JSX.Element => {
  const LIMIT: number = 8;
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { ref, inView }: InViewHookResponse = useInView();
  const { state, dispatch, fetchAPI, deleteStoryPromptController } =
    useAppContext();

  const getStories = async ({
    pageParam = 0,
  }): Promise<{ data: IPublicStory[]; currentOffset: number }> => {
    const { data } = await fetch<IPublicStory[]>({
      method: 'get',
      url: `/api/v1/users/stories${
        props.userId ? `?userId=${props.userId}` : ''
      }${props.favoritesId ? `?favoritesId=${props.favoritesId}` : ''}`,
    });
    return { data, currentOffset: pageParam + 1 };
  };

  const { data, fetchNextPage, hasNextPage, refetch, isFetching, isError } =
    useInfiniteQuery({
      queryKey: ['user-stories'],
      queryFn: getStories,
      getNextPageParam: (lastPage) =>
        lastPage?.data?.length >= LIMIT ? lastPage.currentOffset : undefined,
    });

  const handleDeleteStory = async (storeId: string): Promise<void> => {
    try {
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/stories/${storeId}`,
      });
      deleteStoryPromptController(false, '');
      refetch({ queryKey: ['user-stories'] });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  const handleFavoriteStory = async (storyId: string): Promise<void> => {
    try {
      const { data } = await fetchAPI<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/stories/${storyId}`,
      });
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: {
          ...state,
          publicStories: [
            ...state.publicStories.map((story) =>
              story._id === storyId ? { ...story, favorites: data } : story
            ),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };
  const handleUnFavoriteStory = async (storyId: string): Promise<void> => {
    try {
      const { data } = await fetchAPI<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/stories/${storyId}`,
      });
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: {
          ...state,
          publicStories: [
            ...state.publicStories.map((story) =>
              story._id === storyId ? { ...story, favorites: data } : story
            ),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  useEffect((): (() => void) => {
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
          publicStories: [...reducedStories],
        },
      });
    }

    return (): void => {
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: { ...state, publicStories: [] },
      });
    };
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: { ...state, publicStories: [] },
      });
    };
  }, [router.query, router.asPath, router.route]);

  useEffect((): void => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  return (
    <Container>
      <DeleteStoryPrompt deleteFn={handleDeleteStory} />

      {state.publicStories.length < 1 && (
        <div className='empty-data_container'>
          <section className='content'>
            <IoLeafOutline />
            <h3>
              <span>Nenhuma história para mostrar</span>
            </h3>
            <p>Crie algumas histórias para começar.</p>
          </section>
        </div>
      )}

      {state.publicStories.length > 0 && (
        <section className='stories-container'>
          {state.publicStories.length > 0 &&
            state.publicStories.map((story, index) => (
              <div
                key={String(story._id)}
                className='story-container'
                ref={
                  state.publicStories.length === index + 1 ? ref : undefined
                }>
                <div className='header-container'>
                  <div
                    className='profile-image-container'
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
                        title={`Imagem de perfil de ${story.created_by.first_name} ${story.created_by.last_name}`}
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
                      .map((phrase, index) => (
                        <p key={String(index)}>{phrase}</p>
                      ))
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
                        className='edit'
                        onClick={() =>
                          router.push(`/community/story/${story._id}`)
                        }>
                        <FaEdit />
                        <span>Editar</span>
                      </motion.button>

                      <motion.button
                        className='delete'
                        onClick={() =>
                          deleteStoryPromptController(true, story._id)
                        }>
                        <FaTrash />
                        <span>Apagar</span>
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <motion.button
                        disabled={!state.auth.id && true}
                        className='favorite'
                        onClick={() => {
                          if (!state.auth.token) return;
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
                        className='denounce'
                        onClick={() =>
                          router.push(
                            `/denounce?url=${complements.websiteUrl.concat(
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
      )}

      <div className='stats-container'>
        {isError && !isFetching && (
          <div className=' fetch-error-message '>
            <h3>Erro ao carregar dados.</h3>
            <button onClick={() => fetchNextPage()}>
              <IoReload />
              <span>Tentar novamente</span>
            </button>
          </div>
        )}

        {isFetching && !isError && (
          <div className='loading'>
            <PulseLoader
              size={20}
              color={`rgb(${theme.primary_variant})`}
              aria-placeholder='Processando...'
              cssOverride={{
                display: 'block',
              }}
            />
          </div>
        )}

        {!hasNextPage &&
          !isFetching &&
          !isError &&
          state.publicStories.length > 0 && <p>Chegou ao fim</p>}
      </div>
    </Container>
  );
};

export default StoriesRenderer;
