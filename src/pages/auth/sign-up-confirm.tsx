import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { BiUserPlus } from 'react-icons/bi';
import { complements } from '@/data/app-data';
import { IoLogInOutline } from 'react-icons/io5';
import { _resetConfirmation as Container } from '@/styles/common/reset-password-confirmation';

const SignUpConfirmation: NextPage = (): JSX.Element => (
  <Layout
    metadata={{
      title: `${complements.defaultTitle} | Confirmação de Nova Conta`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }}>
    <Container>
      <main>
        <article>
          <section>
            <div>
              <BiUserPlus />
            </div>
            <h2>Conta de usuário criada</h2>
            <p>
              Você criou a sua nova conta de usuário com sucesso, clique em
              "acessar conta criada" para continuar.
            </p>

            <Link href={`/auth/sign-in`} className='a-open-mail'>
              <IoLogInOutline />
              <span>Acessar conta criada</span>
            </Link>
            <Link href={`/`} className='a-back'>
              <span>Pular, vou acessar mais tarde.</span>
            </Link>
          </section>
        </article>
      </main>
    </Container>
  </Layout>
);

export default SignUpConfirmation;
