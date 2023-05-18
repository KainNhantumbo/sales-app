import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { UserProfileContainer as Container } from '@/styles/common/user-profile';

export default function UserProfile() {
  const {} = useAppContext();
  return (
    <Layout>
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}
