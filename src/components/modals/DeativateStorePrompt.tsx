import { actions } from '@/data/actions';
import { FaStoreSlash } from 'react-icons/fa';
import { IoArrowBackOutline } from 'react-icons/io5';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { PromptContainer as Container } from '../../styles/modules/logout-prompt';

export default function DeactivatePrompt(): JSX.Element {
  const { state, dispatch, deactivateStorePromptController } = useAppContext();

  return (
    <AnimatePresence>
      {state.isDeactivateStorePrompt && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              deactivateStorePromptController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3
              }
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Desativar Loja</span>
                <div className='prompt-message'>
                  <p>Você realmente gostaria de desativar a sua loja?</p>
                  <p>
                    A loja e todos os seus produtos ficarão ocultos do público.
                  </p>
                </div>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={deactivateStorePromptController}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={() => {
                    dispatch({
                      type: actions.STORE_DATA,
                      payload: {
                        ...state,
                        store: {
                          ...state.store,
                          active: !state.store.active
                        }
                      }
                    });
                    deactivateStorePromptController();
                  }}>
                  <FaStoreSlash />
                  <span>Desativar loja</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
