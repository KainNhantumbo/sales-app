import Layout from '@/components/Layout';
import { ResetPassordConfirmation as Container } from '@/styles/common/reset-password-confirmation';
import Link from 'next/link';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { IoMailOpen } from 'react-icons/io5';

export default function ResetPassConfirmation() {
  return (
    <Layout>
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
}
