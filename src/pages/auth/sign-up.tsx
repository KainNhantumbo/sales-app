import coverImage from '@/../public/assets/africa-unveiled.png';
import Layout from '@/components/layout';
import client from '@/config/client';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _signUp as Container } from '@/styles/common/sign-up';
import { HttpError, InputEvents, SubmitEvent } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import * as Io from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

const initialFormState = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  confirm_password: ''
};

export default function Page() {
  const router = useRouter();
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<typeof initialFormState>(initialFormState);

  const handleChange = (e: InputEvents) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password)
      return toast.error('As senhas devem ser iguais.');
    if (formData.password.length < 8)
      return toast.error('A senha deve conter pelo menos 8 caracteres.');

    try {
      setLoading(true);
      await client({ method: 'post', url: '/api/v1/users/account', data: { ...formData } });
      router.push('/auth/sign-up-confirm');
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
        title: `${constants.defaultTitle} | Nova Conta de Usuário`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <Image
          src={coverImage}
          width={1368}
          height={769}
          alt='background image'
          priority={false}
        />
        <main>
          <article>
            <div className='form-container'>
              <h2>Bem vindo à {constants.defaultTitle}</h2>
              <p>Preencha o formulário abaixo para criar uma conta de usuário.</p>
              <form onSubmit={handleSubmit}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='first_name'>
                      <Io.IoEllipsisHorizontal />
                      <span>Nome</span>
                    </label>
                    <input
                      type='text'
                      id='first_name'
                      name='first_name'
                      placeholder='Escreva o seu nome'
                      aria-label='Escreva o seu nome'
                      required={true}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div className='form-element'>
                    <label htmlFor='last_name'>
                      <Io.IoEllipsisHorizontal />
                      <span>Apelido</span>
                    </label>
                    <input
                      type='text'
                      id='last_name'
                      name='last_name'
                      placeholder='Escreva o seu apelido'
                      aria-label='Escreva o seu apelido'
                      required={true}
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='email'>
                      <Io.IoMailOutline />
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
                  </div>
                  <div className='form-element'>
                    <label htmlFor='password'>
                      <Io.IoLockOpenOutline />
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
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </section>

                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='confirm_password'>
                      <Io.IoLockClosedOutline />
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
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </section>

                {
                  <PulseLoader
                    color={`rgb(${theme.primary})`}
                    loading={loading}
                    aria-placeholder='Processando...'
                    cssOverride={{
                      display: 'block',
                      margin: '0 auto'
                    }}
                  />
                }

                <button className='next' type='submit' disabled={loading}>
                  Cadastre-se
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
