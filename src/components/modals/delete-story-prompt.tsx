import { useAppContext } from '@/context/AppContext';
import { _prompt as Container } from '@/styles/modules/logout-prompt';
import { AnimatePresence, motion } from 'framer-motion';
import { BsTrash } from 'react-icons/bs';
import { IoArrowBackOutline } from 'react-icons/io5';

type Props = { deleteFn: any };

export function DeleteStoryPrompt(props: Props) {
  const { state, deleteStoryPromptController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isDeleteStoryPrompt.status && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              deleteStoryPromptController(false, '');
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
                <span className='prompt-title'>Eliminação de história</span>
                <div className='prompt-message'>
                  <p>Você realmente gostaria de eliminar esta história?</p>
                  <p>Esta ação não pode ser desfeita.</p>
                </div>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() => deleteStoryPromptController(false, '')}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={() => props.deleteFn(state.isDeleteStoryPrompt.storyId)}>
                  <BsTrash />
                  <span>Comfirmar</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}