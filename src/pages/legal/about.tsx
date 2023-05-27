import { AboutContainer as Container } from '../../styles/common/about';
import Layout from '@/components/Layout';

export default function About(): JSX.Element {
  return (
    <Layout metadata={{ title: 'Sobre nós' }}>
      <Container>
        <article>
          <h1>
            <strong>Sobre nós</strong>
          </h1>
          

        </article>
      </Container>
    </Layout>
  );
}
