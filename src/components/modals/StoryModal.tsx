import {
  IoCheckmark,
  IoClose,
  IoEllipsisHorizontal,
  IoGiftOutline,
  IoLinkOutline,
  IoPushOutline,
} from 'react-icons/io5';
import { actions } from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { StoryContainer as Container } from '@/styles/modules/story';
import { useEffect } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
import { TStory } from '../../../@types';
import Image from 'next/image';
import { BiUser } from 'react-icons/bi';

export default function Story(): JSX.Element {
  const { state, dispatch, fetchAPI } = useAppContext();

  async function getStory(storyId: string): Promise<void> {
    try {
      const {
        data: { title, content, cover_image, allow_comments },
      }: AxiosResponse<TStory> = await fetchAPI({
        method: 'get',
        url: `/api/users/stories/${storyId}`,
      });
      dispatch({
        type: actions.USER_STORY,
        payload: {
          ...state,
          story: { title, content, cover_image, allow_comments },
        },
      });
    } catch (error: any) {
      console.error(error.response?.data?.message || error);
    }
  }

  async function createStory(): Promise<void> {
    try {
      await fetchAPI({
        method: 'post',
        url: `/api/users/stories`,
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
      dispatch({
        type: actions.STORY_MODAL,
        payload: {
          ...state,
          storyModal: { storyId: '', isActive: false },
        },
      });
    } catch (error: any) {
      console.error(error.response?.data?.message || error);
    }
  }

  useEffect(() => {
    if (state.storyModal.storyId) {
      getStory(state.storyModal.storyId);
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

  return (
    <AnimatePresence>
      {!state.storyModal.isActive && (
        <Container
          className='main'
          onClick={(e): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.STORY_MODAL,
                payload: {
                  ...state,
                  storyModal: { storyId: '', isActive: false },
                },
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <div className='prompt-info'>
                  <span className='prompt-title'>Experiência Profissional</span>
                  <p className='prompt-message'>
                    Coloque informações relevantes da sua experiência
                    profissional para os recrutadores.
                  </p>
                </div>

                <section className='form-container'>
                  <section className='form' spellCheck={'true'}>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='title'>
                          <IoEllipsisHorizontal />
                          <span>Título</span>
                        </label>
                        <input
                          type='text'
                          id='title'
                          placeholder='Título'
                          aria-label='Título'
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
                          <IoLinkOutline />
                          <span>Conteúdo</span>
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
                          <IoGiftOutline />
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
                      {state.story.cover_image &&
                        state.story.cover_image.url && (
                          <Image
                            width={320}
                            height={220}
                            className='cover-image'
                            src={state.story.cover_image.url}
                            title={`Imagem de capa da história`}
                            aria-label={`Imagem de capa da história`}
                            alt={`Imagem de capa da história`}
                          />
                        )}
                      {!state.story.cover_image ||
                        (!state.story.cover_image?.url && (
                          <BiUser className='no-image-icon' />
                        ))}
                    </div>

                    <div className='prompt-actions'>
                      <button
                        className='prompt-cancel'
                        type='reset'
                        onClick={() => {
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
                          dispatch({
                            type: actions.STORY_MODAL,
                            payload: {
                              ...state,
                              storyModal: { storyId: '', isActive: false },
                            },
                          });
                        }}>
                        <IoClose />
                        <span>Cancelar</span>
                      </button>
                      {state.storyModal.storyId ? (
                        <button onClick={() => {}} className='prompt-accept'>
                          <IoPushOutline />
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button className='prompt-accept' onClick={() => {}}>
                          <IoCheckmark />
                          <span>Publicar</span>
                        </button>
                      )}
                    </div>
                  </section>
                </section>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
