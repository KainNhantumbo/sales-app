import {
  IoEllipsisHorizontal,
  IoLockClosedOutline,
  IoLockOpenOutline,
  IoMailOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import Image from 'next/image';
import fetch from '@/config/client';
import { actions } from '@/data/actions';
import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { DefaultTheme, useTheme } from 'styled-components';
import { complements } from '@/data/app-data';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { InputEvents, SubmitEvent } from '@/../@types';
import { _signUp as Container } from '@/styles/common/sign-up';
import backgroundImage from '@/../public/assets/africa-unveiled.png';
import { NextPage } from 'next';

const SignUp: NextPage = (): JSX.Element => {
  const router: NextRouter = useRouter();
  const theme: DefaultTheme = useTheme();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
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
    if (state.signupData.password !== state.signupData.confirm_password)
      return setError({
        status: true,
        message: 'As senhas devem ser iguais.',
      });
    if (state.signupData.password.length < 8)
      return setError({
        status: true,
        message: 'As senhas devem ter pelo menos 8 carácteres.',
      });

    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/account',
        data: {
          email: state.signupData.email,
          password: state.signupData.password,
          first_name: state.signupData.first_name,
          last_name: state.signupData.last_name,
          user_type: 'user',
        },
      });
      router.push('/auth/sign-up-confirm');
    } catch (error: any) {
      console.error(error);
      setError({ status: true, message: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect((): (() => void) => {
    const debounceTimer = setTimeout(() => {
      setError({ status: false, message: '' });
    }, 5000);
    return (): void => clearTimeout(debounceTimer);
  }, [error.status]);

  return (
    <Layout
      metadata={{
        title: `${complements.defaultTitle} | Nova Conta de Usuário`,
      }}>
      <Container>
        <Image
          src={backgroundImage}
          width={1368}
          height={769}
          alt='background image'
          priority={false}
        />
        <main>
          <article>
            <div className='form-container'>
              <h2>Bem vindo à {complements.defaultTitle}</h2>
              <p>
                Preencha o formuário abaixo para criar uma conta de usuário.
              </p>
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
                      <IoLockOpenOutline />
                      <span>Senha</span>
                    </label>
                    <input
                      type='password'
                      id='password'
                      name='password'
                      minLength={8}
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
                      <IoLockClosedOutline />
                      <span>Confirme a senha</span>
                    </label>
                    <input
                      type='password'
                      id='confirm_password'
                      name='confirm_password'
                      aria-hidden='true'
                      minLength={8}
                      placeholder='Confirme a sua senha'
                      aria-label='Confirme a sua senha'
                      onChange={(e): void => handleChange(e)}
                    />
                  </div>
                </section>

                <span className='error-message'>
                  {error.status && !loading ? error.message : `  `}
                </span>

                {
                  <PulseLoader
                    color={`rgb(${theme.primary})`}
                    loading={loading && !error.status && true}
                    aria-placeholder='Processando...'
                    cssOverride={{
                      display: 'block',
                      margin: '0 auto',
                    }}
                  />
                }

                <button
                  className='next'
                  type='submit'
                  disabled={loading || error.status ? true : false}>
                  <span>Cadastre-se</span>
                </button>
              </form>
              <div className='sign-in-options'>
                <div className='signup-request'>
                  Já tem uma conta?
                  <Link href={'/auth/sign-in'}>
                    <span> Acesse a sua conta.</span>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </main>
        <footer>
          &copy; {complements.defaultTitle} |{' '}
          <Link href={'/legal/privacy-policy'}>
            <span>Política de Privacidade</span>
          </Link>
        </footer>
      </Container>
    </Layout>
  );
};
