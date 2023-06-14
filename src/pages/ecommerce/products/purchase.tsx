import Layout from '@/components/Layout';
import { useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { PurchaseContainer as Container } from '@/styles/common/purchase';

export default function Purchase(): JSX.Element {
  const theme = useTheme();
  const { state, dispatch } = useAppContext();
  const router: NextRouter = useRouter();


  return (
    <Layout>
      <Container>
        <div className='wrapper-container'>
          <aside></aside>
          <article></article>
        </div>
      </Container>
    </Layout>
  );
}
