import moment from 'moment';
import Image from 'next/image';
import { NextPage } from 'next';
import fetch from '@/config/client';
import { BiUser } from 'react-icons/bi';
import { actions } from '@/data/actions';
import { useEffect } from 'react';
import { IoBanOutline, IoHeart, IoLeafOutline } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { IPublicStory } from '@/../@types';
import { NextRouter, useRouter } from 'next/router';
import DeleteStoryPrompt from './modals/DeleteStoryPrompt';
import { StoriesRenderContainer as Container } from '@/styles/modules/stories-renderer';
import { complements } from '@/data/app-data';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface IProps {
  userId?: string | undefined;
  favoritesId?: string | undefined;
}

const StoriesRenderer: NextPage<IProps> = (props): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI, deleteStoryPromptController } =
    useAppContext();

  const getStories = async (): Promise<void> => {
    try {
      const { data } = await fetch<IPublicStory[]>({
        method: 'get',
        url: `/api/v1/users/stories${
          props.userId ? `?userId=${props.userId}` : ''
        }${props.favoritesId ? `?favoritesId=${props.favoritesId}` : ''}`,
      });
      console.log(data);
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: { ...state, publicStories: [...data] },
      });
    } catch (error: any) {
      console.error(error.response?.data?.message || error);
    }
  };

  const handleDeleteStory = async (storeId: string): Promise<void> => {
    try {
      await fetchAPI({
        method: 'delete',
        url: `/api/v1/users/stories/${storeId}`,
      });
      deleteStoryPromptController(false, '');
      getStories();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  const handleEditStory = (storyId: string): Promise<boolean> =>
    router.push(`/community/story/${storyId}`);

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

  useEffect(() => {
    getStories();
    return () => {
      dispatch({
        type: actions.PUBLIC_USER_STORIES,
        payload: { ...state, publicStories: [] },
      });
    };
  }, [router.query, router.asPath, router.route]);

  return (
    <Container>
      <DeleteStoryPrompt deleteFn={handleDeleteStory} />

      <section className='stories-container'>
        {state.publicStories.length > 0 &&
          state.publicStories.map((story) => (
            <div key={String(story._id)} className='story-container'>
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
              <section className='actions-container'>
                {story.created_by._id === state.auth.id ? (
                  <>
                    <motion.button
                      className='edit'
                      onClick={() =>
                        router.push(`/community/story/${story._id}`)
                      }>
                        <FaEdit/>
                      <span>Editar</span>
                    </motion.button>
                    <motion.button className='delete' onClick={() => {}}>
                      <FaTrash/>
                      <span>Apagar</span>
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.button className='favorite' onClick={() => {}}>
                      <IoHeart/>
                      <span>Apoiar</span>
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
                        <IoBanOutline/>
                      <span>Denunciar</span>
                    </motion.button>
                  </>
                )}
              </section>
            </div>
          ))}
      </section>

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
    </Container>
  );
};

export default StoriesRenderer;
