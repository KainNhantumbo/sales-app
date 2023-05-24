import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoTrash } from 'react-icons/io5';
import { PromptContainer as Container } from '../../styles/modules/logout-prompt';
import { useAppContext } from '@/context/AppContext';

type Props = {
  deleteFn: any;
};
export default function DeleteCommentPrompt(props: Props): JSX.Element {
  const { state, deleteCommentPromptController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isDeleteCommentPrompt.status && (
        <Container
          className='main'
          onClick={(e: any): void => {
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
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>Eliminar comentário</span>
                <p className='prompt-message'>
                  Você realmente gostaria de eliminar este comentário?
                  <p>Esta ação não pode ser desfeita.</p>
                </p>
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
                  onClick={() =>
                    props.deleteFn(state.isDeleteCommentPrompt.commentId)
                  }>
                  <IoTrash />
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
