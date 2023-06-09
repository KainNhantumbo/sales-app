import Comment from './Comment';
import { AxiosResponse } from 'axios';
import CommentForm from './CommentForm';
import { actions } from '@/data/actions';
import ReplyComment from './ReplyComment';
import { IBlogPost, IComment } from '../../../@types';
import ReplyCommentForm from './ReplyCommentForm';
import { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '@/context/AppContext';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import DeleteCommentPrompt from '../modals/DeleteCommentPrompt';
import { CommentsContainer as Container } from '@/styles/modules/comments';
import Link from 'next/link';

type Props = {
  post: IBlogPost;
};

export default function Comments({ post }: Props): JSX.Element {
  const { state, dispatch, fetchAPI, deleteCommentPromptController } =
    useAppContext();

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
      const { data } = await fetchAPI({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: post._id,
          content: state.comment.content,
          parent_id: null,
        },
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [...state.commentsList, data],
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

  async function handleFavoriteComment(id: string) {
    try {
      const { data } = await fetchAPI({
        method: 'post',
        url: `/api/v1/users/favorites/comments/${id}`,
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === id ? { ...comment, favorites: data } : comment
            ),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  }

  async function handleUnFavoriteComment(id: string) {
    try {
      const { data } = await fetchAPI({
        method: 'patch',
        url: `/api/v1/users/favorites/comments/${id}`,
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === id ? { ...comment, favorites: data } : comment
            ),
          ],
        },
      });
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
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

  useEffect(() => {
    console.info(formattedComments);
    console.info(state.commentsList);
  }, [state.commentsList]);

  useEffect(() => {
    getComments();
    return () => {
      setActiveModes({ reply: false, edit: false });
      clearCommentData();
    };
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
          <p>
            Por favor, seja educado nos seus comentários e respeite o nosso{' '}
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

        <section className='comments-wrapper'>
          <CommentForm
            createComment={handleCreateComment}
            status={{
              reply: activeModes.reply,
              edit: activeModes.edit,
              error,
              loading,
            }}
          />
          <section className='comments-container'>
            {getCommentReplies('null') !== null &&
              getCommentReplies('null')?.length > 0 &&
              getCommentReplies('null')
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((comment) => (
                  <div id={comment._id} key={comment._id} className='comment'>
                    <Comment
                      comment={comment}
                      clearCommentData={clearCommentData}
                      handleEditComment={handleEditComment}
                      handleFavoriteComment={handleFavoriteComment}
                      handleUnFavoriteComment={handleUnFavoriteComment}
                      handleReplyComment={handleReplyComment}
                      updateComment={handleUpdateComment}
                      status={{
                        reply: activeModes.reply,
                        edit: activeModes.edit,
                        error,
                        loading,
                      }}
                    />
                    {comment._id === state.comment._id && (
                      <ReplyCommentForm
                        createComment={handleCreateComment}
                        updateComment={handleUpdateComment}
                        replyComment={handleSendReplyComment}
                        currentCommentId={comment._id}
                        status={{
                          reply: activeModes.reply,
                          edit: activeModes.edit,
                          error,
                          loading,
                        }}
                      />
                    )}

                    {/* ------replies comments-----*/}
                    {getCommentReplies(comment._id) !== null &&
                      getCommentReplies(comment._id)?.length > 0 &&
                      getCommentReplies(comment._id)
                        .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                        .map((comment) => (
                          <div
                            id={comment._id}
                            key={comment._id}
                            className='comment reply-comment'>
                            <ReplyComment
                              comment={comment}
                              clearCommentData={clearCommentData}
                              handleEditComment={handleEditComment}
                              handleFavoriteComment={handleFavoriteComment}
                              handleUnFavoriteComment={handleUnFavoriteComment}
                              handleReplyComment={handleReplyComment}
                              updateComment={handleUpdateComment}
                              status={{
                                reply: activeModes.reply,
                                edit: activeModes.edit,
                                error,
                                loading,
                              }}
                            />

                            {comment._id === state.comment._id && (
                              <ReplyCommentForm
                                createComment={handleCreateComment}
                                updateComment={handleUpdateComment}
                                replyComment={handleSendReplyComment}
                                currentCommentId={comment._id}
                                status={{
                                  reply: activeModes.reply,
                                  edit: activeModes.edit,
                                  error,
                                  loading,
                                }}
                              />
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
