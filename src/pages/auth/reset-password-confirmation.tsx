import Link from 'next/link';
import { NextPage } from 'next';
import Layout from '@/components/Layout';
import { IoMailOpen } from 'react-icons/io5';
import { complements } from '@/data/app-data';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { _resetConfirmation as Container } from '@/styles/common/reset-password-confirmation';

const ResetConfirmation: NextPage = (): JSX.Element => (
  <Layout
    metadata={{
      title: `${complements.defaultTitle} | Confirmação de Atualização de Senha`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }}>
    <Container>
      <main>
        <article>
          <section>
            <div>
              <FaEnvelopeOpenText />
            </div>
            <h2>Confira a sua caixa de e-mail </h2>
            <p>
              Nós enviamos instruções para a atualização da sua senha em seu
              e-mail.
            </p>

            <Link href={`mailto:`} className='a-open-mail'>
              <IoMailOpen />
              <span>Abrir aplicação de e-mail</span>
            </Link>
            <Link href={`/`} className='a-back'>
              <span>Pular, vou confirmar mais tarde.</span>
            </Link>
          </section>
        </article>
        <section>
          <span>Não recebeu o e-mail? Veja a sua caixa de spam.</span>
        </section>
      </main>
    </Container>
  </Layout>
);

export default ResetConfirmation;
