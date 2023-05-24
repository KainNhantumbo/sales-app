import {
  IoArrowUndo,
  IoChatbubbleEllipsesOutline,
  IoEllipse,
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

type Props = {
  post: IBlogPost;
};

export default function Comments({ post }: Props): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, fetchAPI, loginPromptController } = useAppContext();

  const [loading, setLoading] = useState<{
    status: boolean;
    key: 'create-comment' | 'update-comment' | 'delete-comment';
  }>({ status: false, key: 'create-comment' });

  const [error, setError] = useState<{
    status: boolean;
    msg: string;
    key: 'create-comment' | 'update-comment' | 'delete-comment';
  }>({ status: false, msg: '', key: 'create-comment' });

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
          },
        },
      });
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
    setLoading({ status: true, key: 'create-comment' });
    try {
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

  async function handleEditComment(id: string) {}
  async function handleDenounceComment(id: string) {}
  async function handleReplyComment(id: string) {}

  async function handledeleteComment(id: string) {
    setLoading({ status: true, key: 'create-comment' });
    try {
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

  useEffect(() => {
    console.log(formattedComments);
    console.log(state.commentsList);
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
                placeholder='Adicionar comentário...'
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

          <section className='comments-container'>
            {getCommentReplies('null') !== null &&
              getCommentReplies('null')?.length > 0 &&
              getCommentReplies('null')
                .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
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
                          {comment.created_by.first_name}{' '}
                          {comment.created_by.last_name}
                        </h3>

                        <span>
                          {' '}
                          <IoEllipse className='dot' />{' '}
                          {moment(comment.updatedAt).fromNow()}
                        </span>
                      </div>
                      <div className='actions'>
                        <button
                          className='like'
                          onClick={() => handleReplyComment(comment._id)}>
                          <span>{comment.favorites.length}</span>

                          {comment.favorites.includes(
                            comment.created_by._id
                          ) ? (
                            <IoHeart />
                          ) : (
                            <IoHeartOutline />
                          )}
                        </button>
                        {comment.created_by._id === state.userAuth?.id ? (
                          <>
                            <button
                              className='edit'
                              onClick={() => handleEditComment(comment._id)}>
                              <FaEdit />
                              <span>Editar</span>
                            </button>
                            <button
                              className='delete'
                              onClick={() => handledeleteComment(comment._id)}>
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
                              <IoArrowUndo />
                              <span>Denunciar</span>
                            </button>
                            <button
                              className='reply'
                              onClick={() => handleReplyComment(comment._id)}>
                              <IoArrowUndo />
                              <span>Responder</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>

                    <div className='body'>
                      <p>
                        {comment.parent_id && <span>@{'Reply'}</span>}{' '}
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
          </section>
        </section>
      </section>
    </Container>
  );
}
