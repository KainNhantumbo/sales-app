import client from '@/config/client';
import { useAppContext } from '@/context/app-context';
import { errorTransformer } from '@/lib/error-transformer';
import { initialState } from '@/lib/reducer';
import { actions } from '@/shared/actions';
import { _deleteAccount as Container } from '@/styles/modules/delete-account-prompt';
import { HttpError, InputEvents } from '@/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { BsTrash } from 'react-icons/bs';
import { IoArrowBackOutline, IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';

export function DeleteAccountPrompt() {
  const { state, httpClient, dispatch } = useAppContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const [formData, setFormData] = useState({ email: '', password: '' });

  const onChange = (e: InputEvents) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const onDeleteUser = async () => {
    try {
      await httpClient({ method: 'delete', url: '/api/v1/users/account' });
      dispatch({
        type: actions.USER_AUTH,
        payload: { ...state, auth: initialState.auth }
      });
      dispatch({
        type: actions.DELETE_ACCOUNT_PROMPT,
        payload: { ...state, isDeleteAccountPrompt: !state.isDeleteAccountPrompt }
      });
      router.push('/');
    } catch (error) {
      console.error(error);
      const { message } = errorTransformer(error as HttpError);
      setError({ status: true, message });
    }
  };

  const onSubmit = async () => {
    if (formData.password.length < 8)
      return setError({
        status: true,
        message: 'A senha deve conter pelo menos 8 caracteres'
      });

    setLoading(true);
    try {
      // user login
      await client({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: formData,
        withCredentials: true
      });

      //then logout the current user
      await httpClient({
        method: 'post',
        url: '/api/v1/auth/default/logout',
        withCredentials: true
      });
      onDeleteUser();
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      console.error(error);
      setError({ status: true, message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const instance = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return () => clearTimeout(instance);
  }, [error.status]);

  return (
    <AnimatePresence>
      {state.isDeleteAccountPrompt && (
        <Container
          className='main'
          onClick={(e: any) => {
            const isTarget = e.target.classList.contains('main');
            if (isTarget) {
              dispatch({
                type: actions.DELETE_ACCOUNT_PROMPT,
                payload: { ...state, isDeleteAccountPrompt: !state.isDeleteAccountPrompt }
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
                      onChange={onChange}
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
                      onChange={onChange}
                    />
                  </section>

                  {error.status && <span className='error-message'>{error.message}</span>}
                </form>
              </section>
              <div className='prompt-actions'>
                <button
                  className='prompt-cancel'
                  onClick={() =>
                    dispatch({
                      type: actions.DELETE_ACCOUNT_PROMPT,
                      payload: {
                        ...state,
                        isDeleteAccountPrompt: !state.isDeleteAccountPrompt
                      }
                    })
                  }>
                  <IoArrowBackOutline />
                  <span>Cancelar</span>
                </button>
                <button
                  className='prompt-accept'
                  disabled={loading || error.status}
                  onClick={() => onSubmit()}>
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
