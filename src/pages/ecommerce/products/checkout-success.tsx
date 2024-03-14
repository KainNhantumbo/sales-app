import Layout from '@/components/layout';
import { constants } from '@/data/constants';
import { _resetConfirmation as Container } from '@/styles/common/reset-password-confirmation';
import Link from 'next/link';
import { IoBagCheckOutline, IoCartOutline } from 'react-icons/io5';

export default function Page() {
  return (
    <Layout
      metadata={{
        title: `${constants.defaultTitle} | Confirmação de Ordem`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }}>
      <Container>
        <main>
          <article>
            <section>
              <div>
                <IoCartOutline />
              </div>
              <h2>Ordem efetuada com sucesso!</h2>
              <p>
                Você efetuou uma ordem com sucesso, clique em "acessar as suas ordens" para
                continuar.
              </p>

              <Link href={`/dashboard/users/orders`} className='a-open-mail'>
                <IoBagCheckOutline />
                <span>Acessar as suas ordens</span>
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
