import Link from 'next/link';
import Comment from './Comment';
import { AxiosResponse } from 'axios';
import CommentForm from './CommentForm';
import actions from '@/shared/actions';
import ReplyComment from './ReplyComment';
import ReplyCommentForm from './ReplyCommentForm';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { useState, useEffect, useMemo } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import type { IComment } from '@/types/comments';
import DeleteCommentPrompt from '../modals/DeleteCommentPrompt';
import { _comments as Container } from '@/styles/modules/comments';
import { FetchError } from '@/types';

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

export default function Comments({ contentId }: Props) {
  const router = useRouter();
  const { state, dispatch, useFetchAPI, deleteCommentPromptController } =
    useAppContext();

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

  const clearCommentData = () => {
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
            profile_image: { id: '', url: '' }
          },
          content: '',
          parent_id: '',
          favorites: [],
          updatedAt: '',
          createdAt: ''
        }
      }
    });
  };

  const getComments = async () => {
    try {
      const { data } = await useFetchAPI<IComment[]>({
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
  };

  const handleCreateComment = async () => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      const { data } = await useFetchAPI<IComment>({
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
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as FetchError).response?.data?.message ||
          (error as FetchError).message ||
          'Erro: por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const handleUpdateComment = async (id: string) => {
    try {
      const { data }: AxiosResponse<IComment> = await useFetchAPI({
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
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as FetchError).response?.data?.message ||
          (error as FetchError).message ||
          'Erro: por favor, tente novamente.'
      });
    } finally {
      setLoading({ status: false, key: 'create-comment' });
    }
  };

  const handleDeleteComment = async (id: string) => {
    clearCommentData();
    try {
      await useFetchAPI({
        method: 'delete',
        url: `/api/v1/users/comments/${id}`
      });
      deleteCommentPromptController(false, '');
      getComments();
    } catch (error) {
      console.error(
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
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
      const { data } = await useFetchAPI<string[]>({
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
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
      );
    }
  };

  const handleUnFavoriteComment = async (id: string) => {
    try {
      const { data } = await useFetchAPI<string[]>({
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
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
      );
    }
  };

  const handleSendReplyComment = async () => {
    setLoading({ status: true, key: 'create-comment' });
    try {
      await useFetchAPI({
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
        (error as FetchError).response?.data?.message ||
          (error as FetchError).message
      );
      setError({
        status: true,
        key: 'create-comment',
        msg:
          (error as FetchError).response?.data?.message ||
          (error as FetchError).message ||
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
  }, []);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      const q = router.query;
      if (q.productId || contentId) {
        getComments();
      }
    }, 500);
    return () => clearTimeout(debounceTime);
  }, [router.query, router.asPath, router.route, contentId]);

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
