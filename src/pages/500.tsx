import { constants } from '@/data/constants';
import { useRouter } from 'next/router';
import { errorPage as Container } from '../styles/common/error-page';

export default function InternalServerError() {
  const router = useRouter();
  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{constants.defaultTitle}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>500</h1>
        <h2>Erro de Servidor</h2>
        <p>Oops! Parece que um erro inesperado aconteceu. Por favor, tente novamente.</p>
        <button onClick={() => router.reload()}>Recarregar a página</button>
      </section>
    </Container>
  );
}
