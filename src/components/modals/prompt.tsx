import { useAppContext } from '@/context/app-context';
import { actions } from '@/shared/actions';
import { _prompt as Container } from '@/styles/modules/logout-prompt';
import { AnimatePresence, motion } from 'framer-motion';

export function Prompt() {
  const { state, dispatch } = useAppContext();

  const handleQuit = (e: any) => {
    const isTarget = e.target?.classList?.contains('main');

    if (isTarget) {
      dispatch({
        type: actions.PROMPT,
        payload: { ...state, prompt: { ...state.prompt, status: false } }
      });
    }
  };

  return (
    <AnimatePresence>
      {state.prompt.status && (
        <Container className='main' onClick={handleQuit}>
          <motion.section
            initial={{ y: 700 }}
            animate={{ y: 0, transition: { duration: 0.45 } }}
            exit={{ y: 700, transition: { duration: 0.45 } }}
            className='dialog-modal'>
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
                      payload: { ...state, prompt: { ...state.prompt, status: false } }
                    })
                  }>
                  Cancelar
                </button>
                <button className='prompt-accept' onClick={state.prompt.handleFunction}>
                  {state.prompt.actionButtonMessage}
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
