import { complements } from '@/shared/data';
import { errorPage as Container } from '@/styles/common/error-page';

interface IProps {
  title?: string | undefined;
  message?: string | undefined;
  button_message?: string | undefined;
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
        <h1>{props.title ?? 'Opa! Isto é um erro'}</h1>
        <p>
          {props.message ??
            'Oops! Parece que algo ruim aconteceu, por enquanto, isso é tudo que sabemos.'}
        </p>
        <button onClick={props.retryFn}>
          {props.button_message ?? 'Tentar novamente'}
        </button>
      </section>
    </Container>
  );
}
