import backgroundImage from '@/../public/assets/africa-unveiled.png';
import Layout from '@/components/layout';
import fetch from '@/config/client';
import { useAppContext } from '@/context/app-context';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { actions } from '@/shared/actions';
import { _signIn as Container } from '@/styles/common/sign-in';
import type { Auth, HttpError, InputEvents, SubmitEvent } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IoLockClosedOutline, IoMailOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';

export default function Page() {
  const router = useRouter();
  const { state, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e: InputEvents) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      return toast.error('A senha deve conter pelo menos 8 caracteres');
    }
    try {
      setLoading(true);
      const { data } = await fetch<Auth>({
        method: 'post',
        url: '/api/v1/auth/default/login',
        data: { ...formData },
        withCredentials: true
      });
      dispatch({ type: actions.USER_AUTH, payload: { ...state, auth: { ...data } } });
      router.push(`/dashboard`);
    } catch (error) {
      const { message } = errorTransformer(error as HttpError);
      toast.error(message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Acessar Conta de Usuário`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
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
              <h2>Acesso de Usuário</h2>
              <p>Olá, preencha o formulário abaixo para acessar a sua conta de usuário.</p>
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
                    onChange={(e) => handleChange(e)}
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
                    onChange={(e) => handleChange(e)}
                  />
                </section>
                <div className='password-reset'>
                  <Link href={'/auth/reset-password'}>
                    <span>Esqueceu a senha? Recuperar conta.</span>
                  </Link>
                </div>

                <button type='submit' disabled={loading}>
                  Acessar conta
                </button>
              </form>

              <div className='sign-in-options'>
                {/* <h3>
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
                </div> */}
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
        <section className='base-container'>
          &copy; {constants.defaultTitle} |{' '}
          <Link href={'/legal/privacy'}>
            <span>Política de Privacidade</span>
          </Link>
        </section>
      </Container>
    </Layout>
  );
}
