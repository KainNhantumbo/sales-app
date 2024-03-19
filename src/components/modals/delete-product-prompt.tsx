import { useAppContext } from '@/context/AppContext';
import { _prompt as Container } from '@/styles/modules/logout-prompt';
import { AnimatePresence, motion } from 'framer-motion';
import { IoIosTrash } from 'react-icons/io';
import { IoArrowBackOutline } from 'react-icons/io5';

type Props = {
  deleteFn: (productId: string) => Promise<void>;
};

export function DeleteProductPrompt(props: Props) {
  const { state, deleteProductPromptController } = useAppContext();

  return (
    <AnimatePresence>
      {state.isDeleteProductPrompt.status && (
        <Container
          className='main'
          onClick={(e: any) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              deleteProductPromptController(false, '');
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
                <span className='prompt-title'>Eliminar Produto da Loja</span>
                <div className='prompt-message'>
                  <p>
                    Você realmente gostaria de eliminar permanentemente este produto da sua
                    loja?
                  </p>
                  <p>Esta ação não pode ser desfeita.</p>
                </div>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() => deleteProductPromptController(false, '')}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={() => props.deleteFn(state.isDeleteProductPrompt.productId)}>
                  <IoIosTrash />
                  <span>Eliminar</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}