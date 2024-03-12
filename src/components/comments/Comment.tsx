import {
  IoArrowUndo,
  IoClose,
  IoEllipse,
  IoFlag,
  IoHeart,
  IoHeartOutline
} from 'react-icons/io5';

import { useAppContext } from '@/context/AppContext';
import { constants } from '@/data/constants';
import { TComment } from '@/types/comments';
import moment from 'moment';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { BiUser } from 'react-icons/bi';
import { FaEdit, FaTrash } from 'react-icons/fa';

export function Comment(props: TComment) {
  const router = useRouter();
  const { state, deleteCommentPromptController } = useAppContext();

  return (
    <>
      <div className='header'>
        <div className='props'>
          {props.comment.created_by?.profile_image?.url ? (
            <Image
              width={1000}
              height={1000}
              src={props.comment.created_by?.profile_image?.url}
              alt='current user profile picture'
            />
          ) : (
            <BiUser className='user-icon' />
          )}

          <h3>
            {String.prototype.concat(
              props.comment.created_by.first_name,
              ' ',
              props.comment.created_by.last_name
            )}
          </h3>

          <span>
            {' '}
            <IoEllipse className='dot' /> {moment(props.comment.createdAt).fromNow()}
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
          {props.comment.created_by._id === state.auth.id ? (
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
                onClick={() => deleteCommentPromptController(true, props.comment._id)}>
                <FaTrash />
                <span>Apagar</span>
              </button>
            </>
          ) : (
            <>
              <button
                className='denounce'
                onClick={() =>
                  router.push(
                    `/denounce?url=${constants.websiteUrl.concat(
                      router.asPath
                    )}&type=comment&id=${props.comment._id}`
                  )
                }>
                <IoFlag />
                <span>Denunciar</span>
              </button>
              {!props.status.reply || props.comment._id !== state.comment._id ? (
                <button
                  className='reply'
                  onClick={() => props.handleReplyComment(props.comment)}>
                  <IoArrowUndo />
                  <span>Responder</span>
                </button>
              ) : (
                <button className='reply' onClick={() => props.clearCommentData()}>
                  <IoClose />
                  <span>Cancelar</span>
                </button>
              )}
            </>
          )}
        </div>
      </div>

      <div className='body'>
        {!props.status.edit && props.comment._id !== state.comment._id ? (
          props.comment._id !== state.comment._id &&
          !props.comment.content.includes('\n') ? (
            <p>{props.comment.content}</p>
          ) : (
            props.comment.content
              .split('\n')
              .map((phrase, index) => <p key={index.toString()}>{phrase}</p>)
          )
        ) : null}
        {props.comment._id === state.comment.parent_id && props.status.reply && (
          <p>{props.comment.content}</p>
        )}
      </div>
    </>
  );
}
