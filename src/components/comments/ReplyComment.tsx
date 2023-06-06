import {
  IoArrowUndo,
  IoEllipse,
  IoFlag,
  IoHeart,
  IoHeartOutline
} from 'react-icons/io5';
import moment from 'moment';
import { BiUser } from 'react-icons/bi';
import { IComment } from '../../../@types';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useAppContext } from '@/context/AppContext';

type TComment = {
  comment: IComment;
  clearCommentData: () => void;
  updateComment: (id: string) => Promise<void>;
  handleDenounceComment: (id: string) => Promise<void>;
  handleUnFavoriteComment: (id: string) => Promise<void>;
  handleFavoriteComment: (id: string) => Promise<void>;
  handleReplyComment: (data: IComment) => void;
  handleEditComment: (data: IComment) => void;
  status: {
    edit: boolean;
    reply: boolean;
    loading: {
      status: boolean;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
    error: {
      status: boolean;
      msg: string;
      key: 'create-comment' | 'update-comment' | 'delete-comment';
    };
  };
};

export default function ReplyComment(props: TComment): JSX.Element {
  const { state, deleteCommentPromptController } = useAppContext();

  return (
    <>
      <div className='header'>
        <div className='props'>
          {state.auth.profile_image && (
            <img
              src={state.auth.profile_image}
              alt='current user profile picture'
            />
          )}
          {!state.auth.profile_image && <BiUser className='user-icon' />}

          <h3>
            @{props.comment.created_by.first_name.toLowerCase()}_
            {props.comment.created_by.last_name.toLowerCase()}
          </h3>

          <span>
            {' '}
            <IoEllipse className='dot' />{' '}
            {moment(props.comment.createdAt).fromNow()}
          </span>
        </div>
        <div className='actions'>
          <button
            className='like'
            disabled={state.auth?.id === '' && true}
            onClick={() => {
              if (!state.auth?.token) return;
              props.comment.favorites.includes(state.auth?.id)
                ? props.handleUnFavoriteComment(props.comment._id)
                : props.handleFavoriteComment(props.comment._id);
            }}>
            <span>{props.comment.favorites.length}</span>
            {props.comment.favorites.includes(state.auth.id) ? (
              <IoHeart />
            ) : (
              <IoHeartOutline />
            )}
          </button>
          {props.comment.created_by._id === state.auth?.id ? (
            <>
              {!props.status.edit || props.comment._id !== state.comment._id ? (
                <button
                  className='edit'
                  onClick={() => props.handleEditComment(props.comment)}>
                  <FaEdit />
                  <span>Editar</span>
                </button>
              ) : (
                <button className='edit' onClick={props.clearCommentData}>
                  <FaEdit />
                  <span>Cancelar</span>
                </button>
              )}
              <button
                className='delete'
                onClick={() =>
                  deleteCommentPromptController(true, props.comment._id)
                }>
                <FaTrash />
                <span>Deletar</span>
              </button>
            </>
          ) : (
            <>
              <button
                className='denounce'
                onClick={() => props.handleDenounceComment(props.comment._id)}>
                <IoFlag />
                <span>Denunciar</span>
              </button>
              {!props.status.reply ||
              props.comment._id !== state.comment._id ? (
                <button
                  className='reply'
                  onClick={() => props.handleReplyComment(props.comment)}>
                  <IoArrowUndo />
                  <span>Responder</span>
                </button>
              ) : (
                <button
                  className='reply'
                  onClick={() => props.clearCommentData()}>
                  <IoArrowUndo />
                  <span>Cancelar</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className='body'>
        <div className='body'>
          {props.comment._id !== state.comment._id && (
            <>
              <h3>
                {state.commentsList.map((element) => {
                  if (element.parent_id === props.comment._id) {
                    return `@${element.created_by.first_name.toLowerCase()}_${props.comment.created_by.last_name.toLowerCase()}`;
                  }
                  return '';
                })}
              </h3>
              {!props.comment.content.includes('\n') ? (
                <p>{props.comment.content}</p>
              ) : (
                props.comment.content
                  .split('\n')
                  .map((phrase) => <p>{phrase}</p>)
              )}
            </>
          )}
          {props.comment._id === state.comment.parent_id &&
            props.status.reply && (
              <>
                <h3>
                  {state.commentsList.map((element) => {
                    if (element._id === props.comment.parent_id) {
                      return `@${element.created_by.first_name}_${element.created_by.last_name}`;
                    }
                    return '';
                  })}
                </h3>
                {!props.comment.content.includes('\n') ? (
                  <p>{props.comment.content}</p>
                ) : (
                  props.comment.content
                    .split('\n')
                    .map((phrase) => <p>{phrase}</p>)
                )}
              </>
            )}
        </div>
      </div>
    </>
  );
}
