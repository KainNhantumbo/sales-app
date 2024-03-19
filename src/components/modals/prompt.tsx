import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { _prompt as Container } from '@/styles/modules/prompt';
import { AnimatePresence, m as motion } from 'framer-motion';

export function Prompt() {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.prompt.status && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.PROMPT,
                payload: {
                  ...state,
                  prompt: { ...state.prompt, status: false }
                }
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, scale: 0 }}>
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
                  <span>Cancel</span>
                </button>
                <button className='prompt-accept' onClick={state.prompt.handleFunction}>
                  <span>{state.prompt.actionButtonMessage}</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
