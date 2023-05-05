import Link from 'next/link';
import Layout from '@/components/Layout';
import { PostList } from '../../@types';
import { useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { HomeContainer as Container } from '@/styles/common/home';

interface IProps {
  categoriesList: PostList[][];
}

export default function Home(props: IProps): JSX.Element {
  const router = useRouter();
  const { colors } = useAppContext();

  return (
    <Layout>
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}
