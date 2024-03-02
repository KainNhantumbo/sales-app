import { BiUser } from 'react-icons/bi';
import actions from '@/shared/actions';
import { MoonLoader } from 'react-spinners';
import { useTheme } from 'styled-components';
import { useAppContext } from '@/context/AppContext';
import { TCommentForm } from '@/types/comments';
import { useModulesContext } from '@/context/Modules';

type Props = Omit<
  TCommentForm,
  'updateComment' | 'currentCommentId' | 'replyComment'
>;

export default function CommentForm(props: Props) {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const { requestLogin } = useModulesContext();

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
                  if (!state.auth.token) return requestLogin();
                }}
                onTouchEnd={() => {
                  if (!state.auth.token) return requestLogin();
                }}
                onChange={(e) => {
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
              <span className='counter'>{`${
                state.comment.content.length || 0
              } / 512`}</span>
            </div>
          </div>

          {!props.status.loading.status &&
          props.status.error.status &&
          props.status.error.key === 'create-comment' ? (
            <span className='error-message'>{props.status.error.msg}</span>
          ) : null}
          {props.status.loading.status && !props.status.error.status && (
            <div className='loader'>
              <MoonLoader
                size={30}
                color={`rgb(${theme.primary_shade})`}
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
              onClick={() => {
                if (!state.auth.token) return requestLogin();
                props.createComment();
              }}>
              <span>Enviar</span>
            </button>
          )}
        </section>
      )}
    </>
  );
}
