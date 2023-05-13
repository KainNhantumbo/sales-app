import Link from 'next/link';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import { HomeContainer as Container } from '@/styles/common/home';


export default function Home(): JSX.Element {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}
