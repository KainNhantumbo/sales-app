import {
  IoLockClosedOutline,
  IoLogoFacebook,
  IoLogoGoogle,
  IoMailOutline,
} from 'react-icons/io5';
import fetch from '../../config/client';
import { actions } from '../../data/reducer-actions';
import { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import { InputEvents, SubmitEvent } from '../../../@types';
import { SignInContainer as Container } from '../../styles/common/sign-in';
import { complements } from '@/data/app-data';
import Layout from '@/components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import backgroundImage from '../../../public/assets/background1.png';

export default function Signin(): JSX.Element {
  const { state, dispatch } = useAppContext();
  const router: NextRouter = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: false, message: '' });

  const handleChange = (e: InputEvents): void => {
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
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (state.signInData.password.length < 8) {
      setError({
        status: true,
        message: 'A senha deve conter pelo menos 8 carácteres',
      });
      return;
    }
    try {
      setLoading(true);
      const { data } = await fetch({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: state.signInData,
        withCredentials: true,
      });
      dispatch({
        type: actions.USER_AUTH,
        payload: {
          ...state,
          userAuth: {
            token: data?.token,
            id: data?.id,
            invalidated: data?.invalidated,
          },
        },
      });
      console.log(data)
      router.push(`/users/feed`);
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
        <Image src={backgroundImage} alt='background image' />
        <main>
          <article>
            <div className='form-container'>
              <h2>Acesso de Usuário</h2>
              <p>
                Olá, preencha o formuário abaixo para acessar a sua conta de
                usuário.
              </p>
              <form onSubmit={handleSubmit}>
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
                    onChange={(e): void => handleChange(e)}
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
                    onChange={(e): void => handleChange(e)}
                  />
                </section>
                <div className='password-reset'>
                  <Link href={'/auth/reset-password'}>
                    <span>Esqueceu a senha? Recuperar conta.</span>
                  </Link>
                </div>
                {error.status && (
                  <span className='error-message'>{error.message}</span>
                )}

                <button
                  className='login'
                  type='submit'
                  disabled={loading || error.status? true : false}>
                  <span>Acessar conta</span>
                </button>
              </form>

              <div className='sign-in-options'>
                <h3>
                  <span> ━━━━ Ou acesse com ━━━━ </span>
                </h3>
                <div className='login-btns'>
                  <Link href={''}>
                    <IoLogoGoogle />
                    <span>Google</span>{' '}
                  </Link>
                  <Link href={''}>
                    <IoLogoFacebook />
                    <span>Facebook</span>{' '}
                  </Link>
                </div>
                <div className='signup-request'>
                  Ainda não tem uma conta?
                  <Link href={'/auth/sign-up'}>
                    <span> Criar conta.</span>
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
}
