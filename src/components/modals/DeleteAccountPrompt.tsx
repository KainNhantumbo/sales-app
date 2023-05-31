import { motion, AnimatePresence } from 'framer-motion';
import { IoArrowBackOutline, IoTrash } from 'react-icons/io5';
import { PromptContainer as Container } from '../../styles/modules/logout-prompt';
import { useAppContext } from '@/context/AppContext';
import { useRouter, NextRouter } from 'next/router';
import { actions } from '@/data/actions';

export default function DeleteCommentPrompt(): JSX.Element {
  const { state, fetchAPI, dispatch, deleteAccountPromptController } =
    useAppContext();
  const router: NextRouter = useRouter();

  async function deleteUserAccount() {
    try {
      await fetchAPI({
        method: 'delete',
        url: '/api/v1/users/account'
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: {
            id: '',
            name: '',
            token: '',
            email: '',
            profile_image: '',
            invalidated: false
          }
        }
      });
      deleteAccountPromptController();
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <AnimatePresence>
      {state.isDeleteAccountPrompt && (
        <Container
          className='main'
          onClick={(e: any): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              deleteAccountPromptController();
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
                <span className='prompt-title'>
                  Eliminaão de Conta de Usuário
                </span>
                <div className='prompt-message'>
                  <p>
                    Você realmente gostaria de eliminar todos os seus dados e a
                    sua conta?
                  </p>
                  <p>Esta ação não pode ser desfeita.</p>
                </div>
              </div>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() => deleteAccountPromptController()}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  onClick={(): Promise<void> => deleteUserAccount()}>
                  <IoTrash />
                  <span>Sim, eliminar conta.</span>
                </button>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
