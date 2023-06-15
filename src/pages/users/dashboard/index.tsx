import { motion } from 'framer-motion';
import { BiUser } from 'react-icons/bi';
import { IoApps } from 'react-icons/io5';
import Layout from '@/components/Layout';
import { useTheme } from 'styled-components';
import { NextRouter, useRouter } from 'next/router';
import { useAppContext } from '@/context/AppContext';
import { app_metadata, complements, dashboardActions } from '@/data/app-data';
import { DashboardContainer as Container } from '@/styles/common/dashbord';
import Link from 'next/link';

export default function Dashboard(): JSX.Element {
  const theme = useTheme();
  const { state } = useAppContext();
  const router: NextRouter = useRouter();
  const actionRoutes = dashboardActions(state);

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
                {state.auth.profile_image ? (
                  <img
                    src={state.auth.profile_image}
                    alt={`${state.auth.name} + profile picture`}
                  />
                ) : (
                  <BiUser />
                )}
              </div>
              <div className='status-container'>
                <h3>Olá, {state.auth.name}.</h3>
                <p>{state.auth.email}</p>
              </div>
            </section>
          </section>
          <section className='actions-container'>
            <div className='wrapper'>
              <div className='cards-container'>
                {Object.values(actionRoutes)
                  .sort((a, b) => (a.header > b.header ? 1 : -1))
                  .map((element, index) => (
                    <div
                      key={String(index)}
                      className='cards-container_element'>
                      <h3>
                        <element.header.icon />
                        <span>{element.header.label}</span>
                      </h3>
                      <div className='paths-container'>
                        {element.paths
                          .sort((a, b) => (a.label > b.label ? 1 : -1))
                          .map((path, index) => (
                            <Link key={String(index)} href={path.url}>
                              <h3>
                                <path.icon />
                                <span>{path.label}</span>
                              </h3>
                            </Link>
                          ))}
                      </div>
                    </div>
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
