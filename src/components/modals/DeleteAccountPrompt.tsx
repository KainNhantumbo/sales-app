import fetch from '@/config/client';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/shared/actions';
import { _deleteAccount as Container } from '@/styles/modules/delete-account-prompt';
import { HttpError, InputEvents } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoArrowBackOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';

export function DeleteAccountPrompt() {
  const { state, httpClient, dispatch, deleteAccountPromptController } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = ({ e }: { e: InputEvents }) => {
    dispatch({
      type: actions.SIGNIN_DATA,
      payload: {
        ...state,
        signInData: {
          ...state.signInData,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  const deleteUserAccount = async () => {
    try {
      await httpClient({
        method: 'delete',
        url: '/api/v1/users/account'
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          auth: {
            id: '',
            name: '',
            token: '',
            email: '',
            profile_image: '',
            storeId: ''
          }
        }
      });
      deleteAccountPromptController();
      router.push('/');
    } catch (error) {
      console.error(error);
      setError({
        status: true,
        message:
          (error as HttpError).response?.data?.message ||
          'Erro ao eliminar os dados da conta.'
      });
    }
  };

  const handleSubmit = async () => {
    if (state.signInData.password.length < 8) {
      setError({
        status: true,
        message: 'A senha deve conter pelo menos 8 caracteres'
      });
      return;
    }
    try {
      setLoading(true);
      // user login
      await fetch({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: state.signInData,
        withCredentials: true
      });

      // logs the user out
      await httpClient({
        method: 'post',
        url: '/api/v1/auth/default/logout',
        withCredentials: true
      });
      deleteUserAccount();
    } catch (error) {
      console.error(error);
      setError({
        status: true,
        message:
          (error as HttpError).response?.data?.message ||
          'Erro ao eliminar os dados da conta.'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const desc = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => {
      clearTimeout(desc);
    };
  }, [error.status]);

  return (
    <AnimatePresence>
      {state.isDeleteAccountPrompt && (
        <Container
          className='main'
          onClick={(e: any) => {
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
                <span className='prompt-title'>Eliminação de Conta de Usuário</span>
                <div className='prompt-message'>
                  <p>
                    Você realmente gostaria de eliminar todos os seus dados e a sua conta?
                    Esta ação não pode ser desfeita.
                  </p>
                </div>
              </div>
              <section className='form-container'>
                <h2>Para a sua segurança, inicie sessão para continuar.</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                  <section className='input-field'>
                    <label htmlFor='email'>
                      <IoMailOutline />
                      <span>E-mail</span>
                    </label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      placeholder='Escreva o seu e-mail'
                      aria-label='Escreva o seu e-mail'
                      required
                      onChange={(e) => handleChange({ e })}
                    />
                  </section>

                  <section className='input-field'>
                    <label htmlFor='password'>
                      <IoLockClosedOutline />
                      <span>Senha</span>
                    </label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      aria-hidden='true'
                      placeholder='Escreva a sua senha'
                      aria-label='Escreva a sua senha'
                      onChange={(e) => handleChange({ e })}
                    />
                  </section>

                  {error.status && <span className='error-message'>{error.message}</span>}
                </form>
              </section>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() => deleteAccountPromptController()}>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  disabled={loading || error.status ? true : false}
                  onClick={() => handleSubmit()}>
                  <BsTrash />
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
