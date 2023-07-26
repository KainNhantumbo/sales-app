import Link from 'next/link';
import Comment from './Comment';
import { AxiosResponse } from 'axios';
import CommentForm from './CommentForm';
import { actions } from '@/data/actions';
import ReplyComment from './ReplyComment';
import ReplyCommentForm from './ReplyCommentForm';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect, useMemo, FC } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import type { IComment, TComment } from '@/../@types/comments';
import DeleteCommentPrompt from '../modals/DeleteCommentPrompt';
import { _comments as Container } from '@/styles/modules/comments';

type TProps = { contentId: string };

type TError = {
  status: boolean;
  msg: string;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

type TLoading = {
  status: boolean;
  key: 'create-comment' | 'update-comment' | 'delete-comment';
};

const Comments: FC<TProps> = ({ contentId }): JSX.Element => {
  const router: NextRouter = useRouter();
  const { state, dispatch, fetchAPI, deleteCommentPromptController } =
    useAppContext();

  const [loading, setLoading] = useState<TLoading>({
    status: false,
    key: 'create-comment',
  });

  const [error, setError] = useState<TError>({
    status: false,
    msg: '',
    key: 'create-comment',
  });

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

  const getCommentReplies = (parentId: string) => formattedComments[parentId];

  const clearCommentData = (): void => {
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
          updatedAt: '',
          createdAt: '',
        },
      },
    });
  };

  const getComments = async (): Promise<void> => {
    try {
      const { data } = await fetchAPI<TComment[]>({
        method: 'get',
        url: `/api/v1/users/comments/${contentId}`,
      });
      dispatch({
        type: actions.UPDATE_COMMENTS_LIST,
        payload: { ...state, commentsList: [...data] },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateComment = async (): Promise<void> => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      const { data } = await fetchAPI({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: contentId,
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
  };

  const handleUpdateComment = async (id: string): Promise<void> => {
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
  };

  const handleDeleteComment = async (id: string): Promise<void> => {
    clearCommentData();
    try {
      await fetchAPI({ method: 'delete', url: `/api/v1/users/comments/${id}` });
      deleteCommentPromptController(false, '');
      getComments();
    } catch (err: any) {
      console.error(err.response?.data?.message || err);
    }
  };

  const handleReplyComment = (data: IComment): void => {
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
  };

  const handleEditComment = (data: IComment): void => {
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
  };

  const handleFavoriteComment = async (id: string): Promise<void> => {
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
  };

  const handleUnFavoriteComment = async (id: string): Promise<void> => {
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
  };

  const handleSendReplyComment = async (): Promise<void> => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      await fetchAPI({
        method: 'post',
        url: '/api/v1/users/comments',
        data: {
          source_id: contentId,
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
  };

  useEffect((): (() => void) => {
    return (): void => {
      setActiveModes({ reply: false, edit: false });
      clearCommentData();
    };
  }, []);

  useEffect((): (() => void) => {
    const debounceTime = setTimeout(() => {
      const q = router.query;
      if (q.productId || contentId) {
        getComments();
      }
    }, 500);
    return (): void => clearTimeout(debounceTime);
  }, [router.query, router.asPath, router.route, contentId]);

  useEffect((): (() => void) => {
    const desc = setTimeout(() => {
      setError({ status: false, msg: '', key: 'create-comment' });
    }, 5000);
    return (): void => clearTimeout(desc);
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
};

export default Comments;
