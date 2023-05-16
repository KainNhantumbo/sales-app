import { IoLockClosedOutline, IoLogoFacebook, IoLogoGoogle, IoMailOutline } from 'react-icons/io5';
import fetchClient from '../../config/client';
import { actions } from '../../data/reducer-actions';
import { useState } from 'react';
import { ISignInData } from '../../../@types/index';
import { useAppContext } from '../../context/AppContext';
import { NextRouter, useRouter } from 'next/router';
import { InputEvents, SubmitEvent } from '../../../@types';
import { SignInContainer as Container } from '../../styles/common/sign-in';
import { complements } from '@/data/app-data';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function Signin(): JSX.Element {
  const { state, dispatch } = useAppContext();
  const [formData, setFormData] = useState<ISignInData>({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router: NextRouter = useRouter();

  const handleChange = (e: InputEvents): void => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: SubmitEvent): Promise<void> => {
    e.preventDefault();
    if (formData.password.length < 6)
      return handleError('Password must have at least 6 characters');
    try {
      const { data } = await fetchClient({
        method: 'post',
        url: '/auth/login',
        data: formData,
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
      router.push(`/`);
    } catch (err: any) {
      console.log(err);
      handleError(err.response?.data?.message);
    }
  };

  const handleError = (message: string): void => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  };

  return (
    <Layout>
      <Container>
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
                <span className='error-message'>{errorMessage}</span>

                <button className='login' type='submit'>
                  <span>Acessar conta</span>
                </button>
              </form>

              <div className='sign-in-options'>
                <h3>
                  <span> ━━━━ Ou acesse com ━━━━ </span>
                </h3>
                <div className='login-btns'>
                  <Link href={''}>
                   <IoLogoGoogle/>
                    <span>Google</span>{' '}
                  </Link>
                  <Link href={''}>
                    <IoLogoFacebook/>
                    <span>Facebook</span>{' '}
                  </Link>
                </div>
                <div className='signup-request'>
                  Ainda não tem uma conta?
                  <Link href={'/auth/reset-password'}>
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
