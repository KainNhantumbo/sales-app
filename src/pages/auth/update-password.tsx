import Layout from '@/components/layout';
import fetch from '@/config/client';
import { constants } from '@/data/constants';
import { errorTransformer } from '@/lib/error-transformer';
import { _resetPassword as Container } from '@/styles/common/password-reset';
import { HttpError, InputEvents, SubmitEvent } from '@/types';
import Link from 'next/link';
import { useState } from 'react';
import { IoLockClosedOutline, IoLockOpenOutline } from 'react-icons/io5';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useTheme } from 'styled-components';

export default function Page() {
  const theme = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const [passwords, setPasswords] = useState({ password: '', confirm_password: '' });

  const onChange = (e: InputEvents) => {
    setPasswords((state) => ({
      ...state,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    if (passwords.password !== passwords.confirm_password)
      return toast.error('A as senhas devem ser iguais e maiores que 8 carácteres.');

    try {
      setLoading(true);
      await fetch({
        method: 'post',
        url: '/api/v1/users/auth/update-password',
        data: passwords.password,
        withCredentials: true
      });
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
        title: `${constants.defaultTitle} | Atualização de Senha`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <main>
          <article>
            <div className='form-container'>
              <h2>Criar uma nova senha</h2>
              <p>
                A sua nova senha deve ser diferente das senhas utilizadas anteriormente.
              </p>
              <form onSubmit={handleSubmit}>
                <section className='input-field'>
                  <label htmlFor='password'>
                    <IoLockOpenOutline />
                    <span>Nova senha</span>
                  </label>
                  <input
                    type='password'
                    id='password'
                    name='password'
                    minLength={8}
                    aria-hidden='true'
                    placeholder='Escreva a sua nova senha'
                    aria-label='Escreva a sua nova senha'
                    onChange={(e) => onChange(e)}
                  />
                </section>
                <section className='input-field'>
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
                    onChange={(e) => onChange(e)}
                  />
                </section>

                {loading && (
                  <>
                    <PulseLoader
                      color={`rgb(${theme.primary})`}
                      loading={loading}
                      aria-placeholder='Processando...'
                      cssOverride={{
                        display: 'block',
                        margin: '0 auto'
                      }}
                    />
                  </>
                )}

                <button type='submit' disabled={loading}>
                  <span>Recuperar conta</span>
                </button>
              </form>
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
