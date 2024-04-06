import { useAppContext } from '@/context/AppContext';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { _comments as Container } from '@/styles/modules/comments';
import { HttpError } from '@/types';
import type { IComment } from '@/types/comments';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { Comment } from './comment';
import { CommentForm } from './comment-form';
import { ReplyComment } from './reply-comment';
import { ReplyCommentForm } from './reply-comment-form';

type TError = {
  status: boolean;
  msg: string;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

type TLoading = {
  status: boolean;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

export function Comments({ contentId }: { contentId: string }) {
  const router = useRouter();
  const { state, dispatch, httpClient } = useAppContext();
  const [activeModes, setActiveModes] = useState({ edit: false, reply: false });
  const [loading, setLoading] = useState<TLoading>({
    status: false,
    key: 'create-comment'
  });

  const [error, setError] = useState<TError>({
    status: false,
    msg: '',
    key: 'create-comment'
  });

  const formattedComments = useMemo(() => {
    const group: { [index: string]: IComment[] } = {};
    state.commentsList.forEach((comment) => {
      group[comment.parent_id] ||= [];
      group[comment.parent_id].push(comment);
    });
    return group;
  }, [state.commentsList]);

  const getCommentReplies = (parentId: string) => formattedComments[parentId];

  const clearCommentData = () => {
    setActiveModes({ edit: false, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: { ...state, comment: initialState.comment }
    });
  };

  const getComments = useCallback(async () => {
    try {
      const { data } = await httpClient<IComment[]>({
        method: 'get',
        url: `/api/v1/users/comments/${contentId}`
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: { ...state, commentsList: data }
      });
      console.log(data);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(message);
      console.error(error);
    }
  }, [contentId]);

  const onCreate = async () => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      const { data } = await httpClient<IComment>({
        method: 'post',
        url: '/api/v1/users/comments',
        data: { source_id: contentId, content: state.comment.content, parent_id: null }
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: { ...state, commentsList: state.commentsList.concat(data) }
      });
      clearCommentData();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      setError({ status: true, key: 'create-comment', msg: message });
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const onUpdate = async (id: string) => {
    try {
      const { data } = await httpClient<IComment>({
        method: 'patch',
        url: `/api/v1/users/comments/${id}`,
        data: state.comment
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: {
          ...state,
          commentsList: state.commentsList.map((comment) =>
            comment._id === data._id ? { ...comment, ...data } : comment
          )
        }
      });
      clearCommentData();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      setError({ status: true, key: 'create-comment', msg: message });
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const onDelete = (id: string) => {
    dispatch({
      type: actions.PROMPT,
      payload: {
        ...state,
        prompt: {
          ...state.prompt,
          status: true,
          title: 'Eliminar comentário',
          actionButtonMessage: 'Confirmar',
          message: 'Você realmente gostaria de eliminar este comentário?',
          handleFunction: async () => {
            clearCommentData();
            try {
              await httpClient({ method: 'delete', url: `/api/v1/users/comments/${id}` });
              getComments();
            } catch (error) {
              const { message } = errorTransformer(error as HttpError);
              console.error(error);
              toast.error(message);
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

  const handleReplyComment = (data: IComment) => {
    clearCommentData();
    setActiveModes({ edit: false, reply: true });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: {
        ...state,
        comment: { ...state.comment, _id: data._id, parent_id: data._id }
      }
    });
  };

  const handleEditComment = (data: IComment) => {
    clearCommentData();
    setActiveModes({ edit: true, reply: false });
    dispatch({
      type: actions.CREATE_COMMENT,
      payload: { ...state, comment: { ...state.comment, ...data } }
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
          commentsList: state.commentsList.map((comment) =>
            comment._id === id ? { ...comment, favorites: data } : comment
          )
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
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
          commentsList: state.commentsList.map((comment) =>
            comment._id === id ? { ...comment, favorites: data } : comment
          )
        }
      });
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
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
      const { message } = errorTransformer(error as HttpError);
      setError({ status: true, key: 'create-comment', msg: message });
      console.error(error);
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  useEffect(() => {
    return () => {
      setActiveModes({ reply: false, edit: false });
      clearCommentData();
    };
  }, []);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      const q = router.query;
      if (q.productId || contentId) {
        getComments();
      }
    }, 500);
    return () => clearTimeout(debounceTime);
  }, [contentId]);

  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, msg: '', key: 'create-comment' });
    }, 5000);
    return () => clearTimeout(desc);
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
            createComment={onCreate}
            status={{
              reply: activeModes.reply,
              edit: activeModes.edit,
              error,
              loading
            }}
          />
          <section className='comments-container'>
            {Array.isArray(getCommentReplies('null')) &&
              getCommentReplies('null')?.length > 0 &&
              getCommentReplies('null')
                .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                .map((comment) => (
                  <div id={comment._id} key={comment._id} className='comment'>
                    <Comment
                      comment={comment}
                      onDelete={onDelete}
                      clearCommentData={clearCommentData}
                      handleEditComment={handleEditComment}
                      handleFavoriteComment={handleFavoriteComment}
                      handleUnFavoriteComment={handleUnFavoriteComment}
                      handleReplyComment={handleReplyComment}
                      updateComment={onUpdate}
                      status={{
                        reply: activeModes.reply,
                        edit: activeModes.edit,
                        error,
                        loading
                      }}
                    />
                    {comment._id === state.comment._id && (
                      <ReplyCommentForm
                        createComment={onCreate}
                        updateComment={onUpdate}
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
                    {Array.isArray(getCommentReplies(comment._id)) &&
                    getCommentReplies(comment._id).length > 0
                      ? getCommentReplies(comment._id)
                          .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
                          .map((comment) => (
                            <div
                              id={comment._id}
                              key={comment._id}
                              className='comment reply-comment'>
                              <ReplyComment
                                comment={comment}
                                onDelete={onDelete}
                                clearCommentData={clearCommentData}
                                handleEditComment={handleEditComment}
                                handleFavoriteComment={handleFavoriteComment}
                                handleUnFavoriteComment={handleUnFavoriteComment}
                                handleReplyComment={handleReplyComment}
                                updateComment={onUpdate}
                                status={{
                                  reply: activeModes.reply,
                                  edit: activeModes.edit,
                                  error,
                                  loading
                                }}
                              />

                              {comment._id === state.comment._id ? (
                                <ReplyCommentForm
                                  createComment={onCreate}
                                  updateComment={onUpdate}
                                  replyComment={handleSendReplyComment}
                                  currentCommentId={comment._id}
                                  status={{
                                    reply: activeModes.reply,
                                    edit: activeModes.edit,
                                    error,
                                    loading
                                  }}
                                />
                              ) : null}
                            </div>
                          ))
                      : null}
                  </div>
                ))}
          </section>
        </section>
      </section>
    </Container>
  );
}
