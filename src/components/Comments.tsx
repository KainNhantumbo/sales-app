import {
  IoArrowUndo,
  IoChatbubbleEllipsesOutline,
  IoEllipse,
  IoFlag,
  IoHeart,
  IoHeartOutline,
} from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect, useMemo } from 'react';
import { CommentsContainer as Container } from '@/styles/modules/comments';
import { IBlogPost, IComment } from '../../@types';
import { actions } from '@/data/reducer-actions';
import { MoonLoader } from 'react-spinners';
import { BiUser } from 'react-icons/bi';
import moment from 'moment';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import DeleteCommentPrompt from './modals/DeleteCommentPrompt';
import { AxiosResponse } from 'axios';

type Props = {
  post: IBlogPost;
};

export default function Comments({ post }: Props): JSX.Element {
  const theme = useTheme();
  const {
    state,
    dispatch,
    fetchAPI,
    loginPromptController,
    deleteCommentPromptController,
  } = useAppContext();

  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'create-comment' | 'update-comment' | 'delete-comment';
  }>({ status: false, key: 'create-comment' });

  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'create-comment' | 'update-comment' | 'delete-comment';
  }>({ status: false, msg: '', key: 'create-comment' });

  const [activeModes, setActiveModes] = useState({
    edit: false,
    reply: false,
  });
  // ---------------functions----------------
  const formattedComments = useMemo(() => {
    const group: { [index: string]: IComment[] } = {};
    state.commentsList.forEach((comment) => {
      group[comment.parent_id] ||= [];
      group[comment.parent_id].push(comment);
    });
    return group;
  }, [state.commentsList]);

  function getCommentReplies(parentId: string) {
    return formattedComments[parentId];
  }

  function clearCommentData() {
    setActiveModes({ edit: false, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: {
          _id: '',
          source_id: '',
          created_by: {
            _id: '',
            first_name: '',
            last_name: '',
            profile_image: { id: '', url: '' },
          },
          content: '',
          parent_id: '',
          favorites: [],
          invalidated: false,
          updatedAt: '',
          createdAt: '',
        },
      },
    });
  }

  async function getComments(): Promise<void> {
    try {
      const { data } = await fetchAPI({
        method: 'get',
        url: `/api/v1/users/comments/${post._id}`,
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [...data],
        },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async function handleCreateComment(): Promise<void> {
    setLoading({ status: true, key: 'create-comment' });
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: post._id,
          content: state.comment.content,
          parent_id: null,
        },
      });
      clearCommentData();
      getComments();
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

  async function handleUpdateComment(id: string) {
    try {
      const { data }: AxiosResponse<IComment> = await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/comments/${id}`,
        data: {
          ...state.comment,
        },
      });

      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === data._id ? { ...comment, ...data } : comment
            ),
          ],
        },
      });
      clearCommentData();
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

  async function handleDeleteComment(id: string) {
    clearCommentData();
    try {
      await fetchAPI({ method: 'delete', url: `/api/v1/users/comments/${id}` });
      deleteCommentPromptController(false, '');
      getComments();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleFavoriteComment(id: string) {
    try {
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/comments/${id}`,
      });
      getComments();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleUnFavoriteComment(id: string) {
    try {
      await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/favorites/comments/${id}`,
      });
      getComments();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  function handleEditComment(data: IComment): void {
    clearCommentData();
    setActiveModes({ edit: true, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: {
          ...state.comment,
          ...data,
        },
      },
    });
  }

  function handleReplyComment(data: IComment): void {
    clearCommentData();
    setActiveModes({ edit: false, reply: true });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: {
          ...state.comment,
          _id: data._id,
          parent_id: data._id,
        },
      },
    });
  }

  async function handleSendReplyComment(id: string | null): Promise<void> {
    setLoading({ status: true, key: 'create-comment' });
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: post._id,
          content: state.comment.content,
          parent_id: state.comment.parent_id,
        },
      });
      clearCommentData();
      getComments();
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

  async function handleDenounceComment(id: string): Promise<void> {}

  useEffect(() => {
    console.log(formattedComments);
    // console.log(state.commentsList);
  }, [state.commentsList]);

  useEffect(() => {
    getComments();
  }, []);
  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, msg: '', key: 'create-comment' });
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  return (
    <Container>
      <DeleteCommentPrompt deleteFn={handleDeleteComment} />

      <section className='comments-section'>
        <section className='title'>
          <h2>
            <IoChatbubbleEllipsesOutline />
            <span>Comentários</span>
            <span>• {state.commentsList.length}</span>
          </h2>
          <p>Seja respeitoso e educado nos seus comentários.</p>
        </section>

        <section className='comments-wrapper'>
          {activeModes.edit || activeModes.reply ? null : (
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
                  placeholder={
                    state.commentsList.length < 1
                      ? 'Seja o primeiro a adicionar um comentário...'
                      : 'Adicionar um novo comentário...'
                  }
                  name='current-commet'
                  value={state.comment.content}
                  rows={5}
                  onMouseDown={() => {
                    if (!state.userAuth.token) {
                      loginPromptController();
                    }
                  }}
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
                  disabled={
                    loading.status ||
                    error.status ||
                    (state.comment.content.length < 2 && true)
                  }
                  onClick={handleCreateComment}>
                  <span>Enviar</span>
                </button>
              )}
            </section>
          )}

          <section className='comments-container'>
            {getCommentReplies('null') !== null &&
              getCommentReplies('null')?.length > 0 &&
              getCommentReplies('null')
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((comment) => (
                  <div key={comment._id} className='comment'>
                    <div className='header'>
                      <div className='props'>
                        {state.userAuth.profile_image && (
                          <img
                            src={state.userAuth.profile_image}
                            alt='current user profile picture'
                          />
                        )}
                        {!state.userAuth.profile_image && (
                          <BiUser className='user-icon' />
                        )}

                        <h3>
                          @{comment.created_by.first_name.toLowerCase()}_
                          {comment.created_by.last_name.toLowerCase()}
                        </h3>

                        <span>
                          {' '}
                          <IoEllipse className='dot' />{' '}
                          {moment(comment.createdAt).fromNow()}
                        </span>
                      </div>
                      <div className='actions'>
                        <button
                          className='like'
                          disabled={state.userAuth?.id === '' && true}
                          onClick={() => {
                            if (!state.userAuth?.token) return;
                            comment.favorites.includes(state.userAuth?.id)
                              ? handleUnFavoriteComment(comment._id)
                              : handleFavoriteComment(comment._id);
                          }}>
                          <span>{comment.favorites.length}</span>
                          {comment.favorites.includes(state.userAuth.id) ? (
                            <IoHeart />
                          ) : (
                            <IoHeartOutline />
                          )}
                        </button>
                        {comment.created_by._id === state.userAuth?.id ? (
                          <>
                            {!activeModes.edit ||
                            comment._id !== state.comment._id ? (
                              <button
                                className='edit'
                                onClick={() => handleEditComment(comment)}>
                                <FaEdit />
                                <span>Editar</span>
                              </button>
                            ) : (
                              <button
                                className='edit'
                                onClick={clearCommentData}>
                                <FaEdit />
                                <span>Cancelar</span>
                              </button>
                            )}
                            <button
                              className='delete'
                              onClick={() =>
                                deleteCommentPromptController(true, comment._id)
                              }>
                              <FaTrash />
                              <span>Deletar</span>
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className='denounce'
                              onClick={() =>
                                handleDenounceComment(comment._id)
                              }>
                              <IoFlag />
                              <span>Denunciar</span>
                            </button>
                            {!activeModes.reply ||
                            comment._id !== state.comment._id ? (
                              <button
                                className='reply'
                                onClick={() => handleReplyComment(comment)}>
                                <IoArrowUndo />
                                <span>Responder</span>
                              </button>
                            ) : (
                              <button
                                className='reply'
                                onClick={() => clearCommentData()}>
                                <IoArrowUndo />
                                <span>Cancelar</span>
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </div>

                    <div className='body'>
                      {comment._id !== state.comment._id && (
                        <p>{comment.content}</p>
                      )}
                      {comment._id === state.comment.parent_id &&
                        activeModes.reply && <p>{comment.content}</p>}
                    </div>

                    {comment._id === state.comment._id && (
                      <section className='sub-coment'>
                        <div className='comment-swapper'>
                          <textarea
                            placeholder={
                              state.commentsList.length < 1
                                ? 'Seja o primeiro a adicionar um comentário...'
                                : 'Adicionar um novo comentário...'
                            }
                            name='current-commet'
                            value={state.comment.content}
                            rows={5}
                            onMouseDown={() => {
                              if (!state.userAuth.token) {
                                loginPromptController();
                              }
                            }}
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
                            disabled={
                              loading.status ||
                              error.status ||
                              (state.comment.content.length < 2 && true)
                            }
                            onClick={() =>
                              activeModes.edit
                                ? handleUpdateComment(comment._id)
                                : activeModes.reply
                                ? handleSendReplyComment(comment.parent_id)
                                : handleCreateComment()
                            }>
                            {activeModes.edit ? (
                              <span>Atualizar</span>
                            ) : activeModes.reply ? (
                              <span>Responder</span>
                            ) : (
                              <span>Enviar</span>
                            )}
                          </button>
                        )}
                      </section>
                    )}

                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {/* -------------replies comments---------------*/}
                    {getCommentReplies(comment._id) !== null &&
                      getCommentReplies(comment._id)?.length > 0 &&
                      getCommentReplies(comment._id)
                        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                        .map((comment) => (
                          <div key={comment._id} className='comment'>
                            <div className='header'>
                              <div className='props'>
                                {state.userAuth.profile_image && (
                                  <img
                                    src={state.userAuth.profile_image}
                                    alt='current user profile picture'
                                  />
                                )}
                                {!state.userAuth.profile_image && (
                                  <BiUser className='user-icon' />
                                )}

                                <h3>
                                  @{comment.created_by.first_name.toLowerCase()}
                                  _{comment.created_by.last_name.toLowerCase()}
                                </h3>

                                <span>
                                  {' '}
                                  <IoEllipse className='dot' />{' '}
                                  {moment(comment.createdAt).fromNow()}
                                </span>
                              </div>
                              <div className='actions'>
                                <button
                                  className='like'
                                  disabled={state.userAuth?.id === '' && true}
                                  onClick={() => {
                                    if (!state.userAuth?.token) return;
                                    comment.favorites.includes(
                                      state.userAuth?.id
                                    )
                                      ? handleUnFavoriteComment(comment._id)
                                      : handleFavoriteComment(comment._id);
                                  }}>
                                  <span>{comment.favorites.length}</span>
                                  {comment.favorites.includes(
                                    state.userAuth.id
                                  ) ? (
                                    <IoHeart />
                                  ) : (
                                    <IoHeartOutline />
                                  )}
                                </button>
                                {comment.created_by._id ===
                                state.userAuth?.id ? (
                                  <>
                                    {!activeModes.edit ||
                                    comment._id !== state.comment._id ? (
                                      <button
                                        className='edit'
                                        onClick={() =>
                                          handleEditComment(comment)
                                        }>
                                        <FaEdit />
                                        <span>Editar</span>
                                      </button>
                                    ) : (
                                      <button
                                        className='edit'
                                        onClick={clearCommentData}>
                                        <FaEdit />
                                        <span>Cancelar</span>
                                      </button>
                                    )}
                                    <button
                                      className='delete'
                                      onClick={() =>
                                        deleteCommentPromptController(
                                          true,
                                          comment._id
                                        )
                                      }>
                                      <FaTrash />
                                      <span>Deletar</span>
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      className='denounce'
                                      onClick={() =>
                                        handleDenounceComment(comment._id)
                                      }>
                                      <IoFlag />
                                      <span>Denunciar</span>
                                    </button>
                                    {!activeModes.reply ||
                                    comment._id !== state.comment._id ? (
                                      <button
                                        className='reply'
                                        onClick={() =>
                                          handleReplyComment(comment)
                                        }>
                                        <IoArrowUndo />
                                        <span>Responder</span>
                                      </button>
                                    ) : (
                                      <button
                                        className='reply'
                                        onClick={() => clearCommentData()}>
                                        <IoArrowUndo />
                                        <span>Cancelar</span>
                                      </button>
                                    )}
                                  </>
                                )}
                              </div>
                            </div>

                            <div className='body'>
                              {comment._id !== state.comment._id && (
                                <>
                                  <h3>
                                    {state.commentsList.map((element) => {
                                      if (element.parent_id === comment._id) {
                                        return `@${element.created_by.first_name.toLowerCase()}_${comment.created_by.last_name.toLowerCase()}`;
                                      }
                                      return '';
                                    })}
                                  </h3>
                                  <p>{comment.content}</p>
                                </>
                              )}
                              {comment._id === state.comment.parent_id &&
                                activeModes.reply && (
                                  <>
                                    <h3>
                                      {state.commentsList.map((element) => {
                                        if (element._id === comment.parent_id) {
                                          return `@${element.created_by.first_name}_${element.created_by.last_name}`;
                                        }
                                        return '';
                                      })}
                                    </h3>
                                    <p>{comment.content}</p>
                                  </>
                                )}
                            </div>

                            {comment._id === state.comment._id && (
                              <section className='sub-coment'>
                                <div className='comment-swapper'>
                                  <textarea
                                    placeholder={
                                      state.commentsList.length < 1
                                        ? 'Seja o primeiro a adicionar um comentário...'
                                        : 'Adicionar um novo comentário...'
                                    }
                                    name='current-commet'
                                    value={state.comment.content}
                                    rows={5}
                                    onMouseDown={() => {
                                      if (!state.userAuth.token) {
                                        loginPromptController();
                                      }
                                    }}
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
                                    <span className='error-message'>
                                      {error.msg}
                                    </span>
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
                                    disabled={
                                      loading.status ||
                                      error.status ||
                                      (state.comment.content.length < 2 && true)
                                    }
                                    onClick={() =>
                                      activeModes.edit
                                        ? handleUpdateComment(comment._id)
                                        : activeModes.reply
                                        ? handleSendReplyComment(
                                            null
                                          )
                                        : handleCreateComment()
                                    }>
                                    {activeModes.edit ? (
                                      <span>Atualizar</span>
                                    ) : activeModes.reply ? (
                                      <span>Responder</span>
                                    ) : (
                                      <span>Enviar</span>
                                    )}
                                  </button>
                                )}
                              </section>
                            )}
                          </div>
                        ))}
                  </div>
                ))}
          </section>
        </section>
      </section>
    </Container>
  );
}
