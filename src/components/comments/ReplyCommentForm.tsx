import actions from '@/shared/actions';
import { MoonLoader } from 'react-spinners';
import { useAppContext } from '@/context/AppContext';
import type { TCommentForm } from '@/types/comments';
import { DefaultTheme, useTheme } from 'styled-components';

export default function ReplyCommentForm(props: TCommentForm) {
  const theme: DefaultTheme = useTheme();
  const { state, dispatch, loginPromptController } = useAppContext();

  return (
    <>
      <section className='sub-coment'>
        <div className='comment-swapper'>
          <div className='text-area'>
            <textarea
              placeholder={
                state.commentsList.length < 1
                  ? 'Seja o primeiro a adicionar um comentário...'
                  : 'Adicionar um novo comentário...'
              }
              name='current-commet'
              value={state.comment.content}
              rows={5}
              maxLength={512}
              onMouseDown={() => {
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
            <span className='counter'>{`${
              state.comment.content.length || 0
            } / 512`}</span>
          </div>
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
              color={`rgb(${theme.primary_shade})`}
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
            onClick={() => {
              if (!state.auth.token) {
                return loginPromptController();
              }
              if (props.status.edit) {
                return props.updateComment(props.currentCommentId);
              }
              if (props.status.reply) {
                return props.replyComment();
              }
              return props.createComment();
            }}>
            {props.status.edit ? (
              <span>Atualizar</span>
            ) : props.status.reply ? (
              <span>Responder</span>
            ) : (
              <span>Enviar</span>
            )}
          </button>
        )}
      </section>
    </>
  );
}
