import Layout from '@/components/Layout';
import { ResetPassordConfirmation as Container } from '@/styles/common/reset-password-confirmation';
import Link from 'next/link';
import { BiUserPlus } from 'react-icons/bi';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { IoLogInOutline, IoMailOpen } from 'react-icons/io5';

export default function ResetPassConfirmation() {
  return (
    <Layout>
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
                <IoLogInOutline/>
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
}
