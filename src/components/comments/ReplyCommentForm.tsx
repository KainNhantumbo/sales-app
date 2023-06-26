import { actions } from '@/data/actions';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import type { TCommentForm } from '@/../@types/comments';

export default function ReplyCommentForm(props: TCommentForm): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, loginPromptController } = useAppContext();

  return (
    <>
      <section className='sub-coment'>
        <div className='comment-swapper'>
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
            onChange={(e): void => {
              dispatch({
                type: actions.CREATE_COMMENT,
                payload: {
                  ...state,
                  comment: {
                    ...state.comment,
                    content: e.target.value
                  }
                }
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
                margin: '0 auto'
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
            onClick={() =>
              props.status.edit
                ? props.updateComment(props.currentCommentId)
                : props.status.reply
                ? props.replyComment()
                : props.createComment()
            }>
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
