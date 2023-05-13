import { complements } from '@/data/app-data';
import { errorPage as Container } from '../styles/common/error-page';

interface IProps {
  retryFn: () => void;
}

export default function ErrorPage(props: IProps): JSX.Element {
  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{complements.defaultTitle}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>Opa! Isto é um erro.</h1>
        <p>
          Oops! Parece que algo ruim aconteceu, por enquanto, isso é tudo que
          sabemos.
        </p>
        <button onClick={props.retryFn}>Tentar novamente</button>
      </section>
    </Container>
  );
}
