import Layout from '@/components/Layout';
import { AboutContainer as Container } from '../../styles/common/about';
import { complements } from '@/data/app-data';

export default function About(): JSX.Element {
  return (
    <Layout metadata={{ title: complements.defaultTitle + ' | Sobre nós' }}>
      <Container>
        <article>
          <section>
            <h1>Sobre nós</h1>
          </section>

          <section className='body-container'>

          </section>
        </article>
      </Container>
    </Layout>
  );
}
