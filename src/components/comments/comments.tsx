import { useAppContext } from '@/context/AppContext';
import { initialState } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { _comments as Container } from '@/styles/modules/comments';
import { HttpError } from '@/types';
import type { IComment } from '@/types/comments';
import { AxiosResponse } from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { DeleteCommentPrompt } from '../modals/delete-comment-prompt';
import { Comment } from './comment';
import { CommentForm } from './comment-form';
import { ReplyComment } from './reply-comment';
import { ReplyCommentForm } from './reply-comment-form';

type Props = { contentId: string };

type TError = {
  status: boolean;
  msg: string;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

type TLoading = {
  status: boolean;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

export function Comments({ contentId }: Props) {
  const router = useRouter();
  const { state, dispatch, httpClient, deleteCommentPromptController } = useAppContext();

  const [loading, setLoading] = useState<TLoading>({
    status: false,
    key: 'create-comment'
  });

  const [error, setError] = useState<TError>({
    status: false,
    msg: '',
    key: 'create-comment'
  });

  const [activeModes, setActiveModes] = useState({
    edit: false,
    reply: false
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

  const getCommentReplies = (parentId: string) => formattedComments[parentId];

  const clearCommentData = useCallback(() => {
    setActiveModes({ edit: false, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: { ...state, comment: initialState.comment }
    });
  }, [dispatch, state]);

  const getComments = useCallback(async () => {
    try {
      const { data } = await httpClient<IComment[]>({
        method: 'get',
        url: `/api/v1/users/comments/${contentId}`
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: { ...state, commentsList: [...data] }
      });
    } catch (error) {
      console.error(error);
    }
  }, [contentId, dispatch, httpClient, state]);

  const handleCreateComment = async () => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      const { data } = await httpClient<IComment>({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: contentId,
          content: state.comment.content,
          parent_id: null
        }
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [...state.commentsList, data]
        }
      });
      clearCommentData();
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          'Erro: por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const handleUpdateComment = async (id: string) => {
    try {
      const { data }: AxiosResponse<IComment> = await httpClient({
        method: 'patch',
        url: `/api/v1/users/comments/${id}`,
        data: {
          ...state.comment
        }
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === data._id ? { ...comment, ...data } : comment
            )
          ]
        }
      });
      clearCommentData();
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          'Erro: por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const handleDeleteComment = async (id: string) => {
    clearCommentData();
    try {
      await httpClient({
        method: 'delete',
        url: `/api/v1/users/comments/${id}`
      });
      deleteCommentPromptController(false, '');
      getComments();
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  const handleReplyComment = (data: IComment) => {
    clearCommentData();
    setActiveModes({ edit: false, reply: true });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: {
          ...state.comment,
          _id: data._id,
          parent_id: data._id
        }
      }
    });
  };

  const handleEditComment = (data: IComment) => {
    clearCommentData();
    setActiveModes({ edit: true, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: {
          ...state.comment,
          ...data
        }
      }
    });
  };

  const handleFavoriteComment = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'post',
        url: `/api/v1/users/favorites/comments/${id}`
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === id ? { ...comment, favorites: data } : comment
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

  const handleUnFavoriteComment = async (id: string) => {
    try {
      const { data } = await httpClient<string[]>({
        method: 'patch',
        url: `/api/v1/users/favorites/comments/${id}`
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: [
            ...state.commentsList.map((comment) =>
              comment._id === id ? { ...comment, favorites: data } : comment
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

  const handleSendReplyComment = async () => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      await httpClient({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: contentId,
          content: state.comment.content,
          parent_id: state.comment.parent_id
        }
      });
      clearCommentData();
      getComments();
    } catch (error) {
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as HttpError).response?.data?.message ||
          (error as HttpError).message ||
          'Erro: por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  useEffect(() => {
    return () => {
      setActiveModes({ reply: false, edit: false });
      clearCommentData();
    };
  }, [clearCommentData]);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      const q = router.query;
      if (q.productId || contentId) {
        getComments();
      }
    }, 500);
    return () => clearTimeout(debounceTime);
  }, [router, contentId, getComments]);

  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, msg: '', key: 'create-comment' });
    }, 5000);
    return () => clearTimeout(desc);
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
              loading
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
                        loading
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
                          loading
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
                                loading
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
                                  loading
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
