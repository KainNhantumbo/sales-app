import { useAppContext } from '@/context/AppContext';
import { _prompt as Container } from '@/styles/modules/logout-prompt';
import { AnimatePresence, motion } from 'framer-motion';
import { BsTrash } from 'react-icons/bs';
import { IoArrowBackOutline } from 'react-icons/io5';

type Props = { deleteFn: any };

export function DeleteCommentPrompt(props: Props) {
  const { state, deleteCommentPromptController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isDeleteCommentPrompt.status && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              deleteCommentPromptController(false, '');
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
                <span className='prompt-title'>Eliminar comentário</span>
                <div className='prompt-message'>
                  <p>Você realmente gostaria de eliminar este comentário?</p>
                  <p>Esta ação não pode ser desfeita.</p>
                </div>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() => deleteCommentPromptController(false, '')}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={() => props.deleteFn(state.isDeleteCommentPrompt.commentId)}>
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