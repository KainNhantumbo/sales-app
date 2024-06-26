import Layout from '@/components/layout';
import { Metrics } from '@/components/metrics';
import { useAppContext } from '@/context/app-context';
import { constants } from '@/data/constants';
import { buildActions } from '@/lib/dashboard-actions';
import { _dashboard as Container } from '@/styles/common/dashbord';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BiUser } from 'react-icons/bi';
import { IoApps, IoConstruct } from 'react-icons/io5';
import { useTheme } from 'styled-components';

export default function Page() {
  const { state } = useAppContext();
  const theme = useTheme();
  const actionRoutes = buildActions({
    storeId: state.auth.storeId,
    userId: state.auth.id
  });

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Painel de Controle` }}>
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
                  <Image
                    width={1000}
                    height={1000}
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
              <h2>
                <IoConstruct />
                <span>Ferramentas</span>
              </h2>
              <div className='cards-container'>
                {Object.values(actionRoutes)
                  .sort((a, b) => (a.header.label > b.header.label ? 1 : -1))
                  .map((element, index) => (
                    <div key={String(index)} className='cards-container_element'>
                      <h3>
                        <element.header.icon />
                        <span>{element.header.label}</span>
                      </h3>
                      <div className='paths-container'>
                        {element.paths
                          .sort((a, b) => (a.label > b.label ? 1 : -1))
                          .map((path, index) => (
                            <motion.div
                              className='action'
                              key={String(index)}
                              initial={{ scale: 0 }}
                              drag={true}
                              dragElastic={0.3}
                              whileTap={{ scale: 0.9 }}
                              dragConstraints={{
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0
                              }}
                              whileInView={{
                                scale: 1,
                                transition: { duration: 0.5, bounce: 1 }
                              }}
                              whileHover={{
                                translateY: -8,
                                boxShadow: `0px 12px 25px 10px rgba(${theme.black}, 0.09)`
                              }}>
                              <Link href={path.url}>
                                <path.icon />
                                <span>{path.label}</span>
                              </Link>
                            </motion.div>
                          ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          <section className='metrics-data'>
            <div className='wrapper'>
              <Metrics key={'user-metrics'} />
            </div>
          </section>
        </article>

        <section className='app-meta'>
          <p>
            {constants.appName} | versão {constants.version}{' '}
          </p>
          <p>Copyright {constants.copyright}</p>
          <h3>{constants.notice}</h3>
        </section>
      </Container>
    </Layout>
  );
}
