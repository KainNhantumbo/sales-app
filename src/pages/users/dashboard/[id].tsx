import Layout from '@/components/Layout';
import { UserDashboardContainer as Container } from '@/styles/common/user-dashbord';
import { NextRouter, useRouter } from 'next/router';
import { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { useAppContext } from '@/context/AppContext';
import { BiBriefcaseAlt2, BiStoreAlt, BiUserCheck } from 'react-icons/bi';
import { IoAlbumsOutline } from 'react-icons/io5';

export default function Dashboard(): JSX.Element {
  const theme = useTheme();
  const router: NextRouter = useRouter();
  const { state } = useAppContext();

  const actionRoutes = [
    {
      url: `/users/dashboard/${state.userAuth.id}/profile-editor`,
      icon: BiUserCheck,
      label: 'Editor de Perfil',
    },
    {
      url: `/users/dashboard/${state.userAuth.id}/store-editor`,
      icon: BiStoreAlt,
      label: 'Editor de Loja',
    },
    {
      url: `/users/dashboard/${state.userAuth.id}/job-editor`,
      icon: BiBriefcaseAlt2,
      label: 'Empregos',
    },
    {
      url: `/users/dashboard/${state.userAuth.id}/post-editor`,
      icon: IoAlbumsOutline,
      label: 'Postagens',
    },
  ];

  return (
    <Layout>
      <Container>
        <article>
          <section className='actions'>
            <div className='wrapper'>
              <div className='cards-container'>
                {actionRoutes.map((card, index) => (
                  <motion.div
                    key={index.toString()}
                    onClick={() => router.push(card.url)}
                    initial={{
                      scale: 1,
                      boxShadow: `0px 0px 20px rgba(${theme.accent}, 0.05)`,
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                      boxShadow: `0px 0px 25px rgba(${theme.accent}, 0.09)`,
                      scale: 1.05,
                    }}>
                    <card.icon />
                    <h3>{card.label}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </article>
      </Container>
    </Layout>
  );
}
