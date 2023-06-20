import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import fetch from '../../../config/client';
import { User } from '../../../../@types';
import ErrorPage from '@/pages/error-page';
import { NextRouter, useRouter } from 'next/router';
import { ProfileContainer as Container } from '@/styles/common/community-user-profile';
import { useEffect } from 'react';
import { complements } from '@/data/app-data';

type TProps = { user: User };

export default function UserProfile({ user }: TProps): JSX.Element {
  const { state } = useAppContext();
  const router: NextRouter = useRouter();

  if (!user) return <ErrorPage retryFn={() => router.reload()} />;

  useEffect(() => {
    console.info(user);
  }, []);

  return (
    <Layout
      metadata={{
        title: `${
          complements.defaultTitle
        } | Perfil de ${String.prototype.concat(
          user.first_name,
          ' ',
          user.last_name
        )}`,
        createdAt: user.createdAt,
        updatedAt: user.createdAt,
      }}>
      <Container>
        <article></article>
      </Container>
    </Layout>
  );
}

export async function getStaticPaths(): Promise<any> {
  const slugs = await fetch<User[]>({
    method: 'get',
    url: '/api/v1/users/account?fields=name',
  }).then((res) => res.data.map((item) => ({ params: { slug: item._id } })));
  return { paths: slugs, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  try {
    const { data: user } = await fetch<User>({
      method: 'get',
      url: `/api/v1/users/account/public/${slug}`,
    });
    return { props: { user }, revalidate: 10 };
  } catch (error) {
    console.error(error);
    return { props: {}, revalidate: 10 };
  }
}
