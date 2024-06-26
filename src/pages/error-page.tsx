import { constants } from '@/data/constants';
import { errorPage as Container } from '@/styles/common/error-page';

type Props = {
  title?: string;
  message?: string;
  button_message?: string;
  onRetry: () => void;
};

export default function Page(props: Props) {
  return (
    <Container>
      <section className='logo-container'>
        <div className='logo'>
          <span>{constants.defaultTitle}</span>
        </div>
      </section>
      <section className='content-container'>
        <h1>{props.title ?? 'Opa! Isto é um erro'}</h1>
        <p>
          {props.message ??
            'Oops! Parece que algo errado aconteceu, por enquanto, isso é tudo que sabemos.'}
        </p>
        <button onClick={props.onRetry}>
          {props.button_message ?? 'Tentar novamente'}
        </button>
      </section>
    </Container>
  );
}
