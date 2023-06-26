import { BiUser } from 'react-icons/bi';
import { actions } from '@/data/actions';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import type { TMainCommentForm } from '../../../@types/comments';

export default function CommentForm(props: TMainCommentForm): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, loginPromptController } = useAppContext();

  return (
    <>
      {props.status.edit || props.status.reply ? null : (
        <section className='current-comment'>
          <div className='comment-swapper'>
            {state.auth.profile_image && (
              <img
                src={state.auth.profile_image}
                alt='current user profile picture'
              />
            )}
            {!state.auth.profile_image && <BiUser />}
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
                if (!state.auth.token) {
                  loginPromptController();
                }
              }}
              onTouchEnd={() => {
                if (!state.auth.token) {
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

          {!props.status.loading.status &&
            props.status.error.status &&
            props.status.error.key === 'create-comment' && (
              <span className='error-message'>{props.status.error.msg}</span>
            )}
          {props.status.loading.status && !props.status.error.status && (
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
          {!props.status.loading.status && !props.status.error.status && (
            <button
              disabled={
                props.status.loading.status ||
                props.status.error.status ||
                (state.comment.content.length < 2 && true)
              }
              onClick={props.createComment}>
              <span>Enviar</span>
            </button>
          )}
        </section>
      )}
    </>
  );
}
