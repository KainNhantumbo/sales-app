import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { _prompt as Container } from '@/styles/modules/logout-prompt';
import { AnimatePresence } from 'framer-motion';

export function Prompt() {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.prompt.status && (
        <Container
          className='main'
          onClick={(e: any) => {
            const isTarget: boolean = e.target.classList.contains('main');
            if (isTarget) {
              dispatch({
                type: actions.PROMPT,
                payload: { ...state, prompt: { ...state.prompt, status: false } }
              });
            }
          }}>
          <section className='dialog-modal'>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>{state.prompt.title}</span>
                <p className='prompt-message'>{state.prompt.message}</p>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.PROMPT,
                      payload: {
                        ...state,
                        prompt: { ...state.prompt, status: false }
                      }
                    })
                  }>
                  Cancel
                </button>
                <button className='prompt-accept' onClick={state.prompt.handleFunction}>
                  {state.prompt.actionButtonMessage}
                </button>
              </div>
            </div>
          </section>
        </Container>
      )}
    </AnimatePresence>
  );
}
