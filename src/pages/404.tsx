import { constants } from '@/data/constants';
import { useRouter } from 'next/router';
import { errorPage as Container } from '../styles/common/error-page';

export default function Page() {
  const router = useRouter();
  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{constants.defaultTitle}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>404</h1>
        <h2>Página não encontrada</h2>
        <p>Desculpa, mas a página que está a procura não existe.</p>
        <button onClick={() => router.back()}>Voltar para página anterior</button>
      </section>
    </Container>
  );
}
