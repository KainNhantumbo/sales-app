import {
  IoArrowBackOutline,
  IoLockClosedOutline,
  IoMailOutline,
  IoTrash,
} from 'react-icons/io5';
import fetch from '../../config/client';
import { actions } from '@/data/actions';
import { useState, useEffect } from 'react';
import { InputEvents } from '../../../@types';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { useRouter, NextRouter } from 'next/router';
import { DeleteAccountContainer as Container } from '../../styles/modules/delete-account-prompt';

export default function DeleteCommentPrompt(): JSX.Element {
  const { state, fetchAPI, dispatch, deleteAccountPromptController } =
    useAppContext();
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  function handleChange({ e }: { e: InputEvents }): void {
    dispatch({
      type: actions.SIGNIN_DATA,
      payload: {
        ...state,
        signInData: {
          ...state.signInData,
          [e.target.name]: e.target.value,
        },
      },
    });
  }

  async function deleteUserAccount(): Promise<void> {
    try {
      await fetchAPI({
        method: 'delete',
        url: '/api/v1/users/account',
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
            storeId: '',
          },
        },
      });
      deleteAccountPromptController();
      router.push('/');
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        message:
          error.response?.data?.message ||
          'Erro ao eliminar os dados da conta.',
      });
    }
  }

  async function handleSubmit(): Promise<void> {
    if (state.signInData.password.length < 8) {
      setError({
        status: true,
        message: 'A senha deve conter pelo menos 8 caracteres',
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
        withCredentials: true,
      });

      // logs the user out
      await fetchAPI({
        method: 'post',
        url: '/api/v1/auth/default/logout',
        withCredentials: true,
      });
      deleteUserAccount();
    } catch (error: any) {
      console.error(error);
      setError({
        status: true,
        message:
          error.response?.data?.message ||
          'Erro ao eliminar os dados da conta.',
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect((): (() => void) => {
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
                duration: 0.3,
              },
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <span className='prompt-title'>
                  Eliminação de Conta de Usuário
                </span>
                <div className='prompt-message'>
                  <p>
                    Você realmente gostaria de eliminar todos os seus dados e a
                    sua conta? Esta ação não pode ser desfeita.
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
                      onChange={(e): void => handleChange({ e })}
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
                      onChange={(e): void => handleChange({ e })}
                    />
                  </section>

                  {error.status && (
                    <span className='error-message'>{error.message}</span>
                  )}
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
                  onClick={(): Promise<void> => handleSubmit()}>
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
