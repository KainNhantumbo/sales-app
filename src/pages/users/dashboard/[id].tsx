import { motion } from 'framer-motion';
import { BiUser } from 'react-icons/bi';
import { IoApps } from 'react-icons/io5';
import Layout from '@/components/Layout';
import { useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { app_metadata, complements, dashboardRoutes } from '@/data/app-data';
import { UserDashboardContainer as Container } from '@/styles/common/user-dashbord';

export default function Dashboard(): JSX.Element {
  const theme = useTheme();
  const { state } = useAppContext();
  const router: NextRouter = useRouter();
  const actionRoutes = dashboardRoutes(state.userAuth?.id);

  return (
    <Layout
      metadata={{ title: `${complements.defaultTitle} | Painel de Controle` }}>
      <Container>
        <article>
          <section className='header'>
            <h2>
              <IoApps />
              <span>Painel de Controle</span>
            </h2>
            <section className='user-container'>
              <div className='avatar-container'>
                {state.userAuth.profile_image ? (
                  <img
                    src={state.userAuth.profile_image}
                    alt={`${state.userAuth.name} + profile picture`}
                  />
                ) : (
                  <BiUser />
                )}
              </div>
              <div className='status-container'>
                <h3>Olá, {state.userAuth.name}.</h3>
                <p>{state.userAuth.email}</p>
              </div>
            </section>
          </section>
          <section className='actions'>
            <div className='wrapper'>
              <div className='cards-container'>
                {actionRoutes.map((card, index) => (
                  <motion.div
                    key={index.toString()}
                    onClick={() => router.push(card.url)}
                    initial={{
                      scale: 1,
                      boxShadow: `0px 0px 30px rgba(${theme.accent}, 0.09)`
                    }}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                      boxShadow: `0px 0px 25px rgba(${theme.accent}, 0.1)`,
                      scale: 1.05
                    }}>
                    <card.icon />
                    <h3>{card.label}</h3>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </article>

        <section className='app-meta'>
          <p>
            {app_metadata.appName} | versão {app_metadata.version}{' '}
          </p>
          <p>Copyright {app_metadata.copyright}</p>
          <h3>{app_metadata.notice}</h3>
        </section>
      </Container>
    </Layout>
  );
}
