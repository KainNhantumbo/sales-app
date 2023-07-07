import moment from 'moment';
import Image from 'next/image';
import fetch from '@/config/client';
import { BiUser } from 'react-icons/bi';
import { actions } from '@/data/actions';
import { useEffect } from 'react';
import { IoLeafOutline } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { IPublicStory } from '@/../@types';
import { StoriesRenderContainer as Container } from '@/styles/modules/stories-renderer';
import { NextRouter, useRouter } from 'next/router';
import DeleteStoryPrompt from './modals/DeleteStoryPrompt';

interface IProps {
  userId?: string | undefined;
  favoritesId?: string | undefined;
}

const StoriesRenderer = (props: IProps): JSX.Element => {
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
      const { data } = await fetchAPI({
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
      const { data } = await fetchAPI({
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
                <div className='profile-image-container'>
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
              <div className='actions-container'></div>
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
