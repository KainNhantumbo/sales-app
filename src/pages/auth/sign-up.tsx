import {
  IoAnalytics,
  IoEllipsisHorizontal,
  IoLockClosed,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoLogInOutline,
  IoMailOutline,
  IoPerson,
} from 'react-icons/io5';
import fetch from '../../config/client';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/data/reducer-actions';
import { useState, useEffect } from 'react';
import { InputEvents, SubmitEvent } from '../../../@types';
import { NextRouter, useRouter } from 'next/router';
import { SignUpContainer as Container } from '../../styles/common/sign-up';
import Layout from '@/components/Layout';
import { PulseLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function Signup(): JSX.Element {
  const router: NextRouter = useRouter();
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e: InputEvents): void => {
    dispatch({
      type: actions.SIGNUP_DATA,
      payload: {
        ...state,
        signupData: {
          ...state.signupData,
          [e.target.name]: e.target.value,
        },
      },
    });
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (state.signupData.password !== state.signupData.confirm_password) {
    }

    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/auth',
        data: {
          email: state.signupData.email,
          password: state.signupData.password,
          first_name: state.signupData.first_name,
          last_name: state.signupData.last_name,
        },
      });
      router.push('/auth/sign-in');
    } catch (error: any) {
      console.error(error);
      setError({ status: true, message: error?.response?.data?.message });
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
    <Layout>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Bem vindo a nossa comunidade</h2>
              <form onSubmit={handleSubmit}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='first_name'>
                      <IoEllipsisHorizontal />
                      <span>Nome</span>
                    </label>
                    <input
                      type='text'
                      id='first_name'
                      name='first_name'
                      placeholder='Escreva o seu nome'
                      aria-label='Escreva o seu nome'
                      required={true}
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                  <div className='form-element'>
                    <label htmlFor='last_name'>
                      <IoEllipsisHorizontal />
                      <span>Apelido</span>
                    </label>
                    <input
                      type='text'
                      id='last_name'
                      name='last_name'
                      placeholder='Escreva o seu apelido'
                      aria-label='Escreva o seu apelido'
                      required={true}
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
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
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                  <div className='form-element'>
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
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='confirm_password'>
                      <IoLockOpenOutline />
                      <span>Confirme a senha</span>
                    </label>
                    <input
                      type='password'
                      id='confirm_password'
                      name='confirm_password'
                      aria-hidden='true'
                      placeholder='Confirme a sua senha'
                      aria-label='Confirme a sua senha'
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                </section>

                {error.status && (
                  <span className='error-message'>{error.message}</span>
                )}

                {loading && !error.status && (
                  <>
                    <PulseLoader
                      color={`rgb(${theme.primary})`}
                      loading={loading}
                      aria-placeholder='Processando...'
                      cssOverride={{
                        display: 'block',
                        margin: '0 auto',
                      }}
                    />
                  </>
                )}

                <section className='actions'>
                  <button className='next' type='submit'>
                    <IoLogInOutline />
                    <span>Get started</span>
                  </button>
                  <button
                    className='login'
                    onClick={(): Promise<boolean> =>
                      router.push('/auth/sign-in')
                    }>
                    <IoLockOpenOutline />
                    <span>Login</span>
                  </button>
                </section>
              </form>
            </div>
          </article>
        </main>
        <footer>
          <div>
            Copyright &copy; 2022 <i>Normies Team</i>
          </div>
          <div>All Rights Reserved.</div>
        </footer>
      </Container>
    </Layout>
  );
}
