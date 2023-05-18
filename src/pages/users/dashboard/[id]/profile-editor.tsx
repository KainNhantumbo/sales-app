import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { actions } from '@/data/reducer-actions';
import { UserDashboardContainer as Container } from '@/styles/common/user-dashbord';
import { NextRouter, useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { IoReload } from 'react-icons/io5';
import { DotLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

export default function ProfileEditor() {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state, fetchAPI, dispatch } = useAppContext();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState({ status: false, msg: '' });

  async function getUserData(): Promise<void> {
    try {
      setLoading(true);
      const { data } = await fetchAPI({
        method: 'get',
        url: `/api/v1/users/account/${state.userAuth.id}`,
      });
      dispatch({
        type: actions.USER_DATA,
        payload: data,
      });
      console.log(data);
    } catch (error: any) {
      console.error(error);
      setError({ status: true, msg: error?.response?.data?.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <Container>

        <article></article>
      </Container>
    </Layout>
  );
}
