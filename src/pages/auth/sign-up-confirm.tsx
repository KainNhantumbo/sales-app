import Link from 'next/link';
import Layout from '@/components/Layout';
import { BiUserPlus } from 'react-icons/bi';
import { IoLogInOutline} from 'react-icons/io5';
import { ResetPassordConfirmation as Container } from '@/styles/common/reset-password-confirmation';
import { complements } from '@/data/app-data';

export default function SignUpConfirmation(): JSX.Element {
  return (
    <Layout metadata={{
      title: `${complements.defaultTitle} | Confirmação de Nova Conta`
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
