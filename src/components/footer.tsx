import { useAppContext } from '@/context/app-context';
import { useThemeContext } from '@/context/theme-context';
import { constants, HEADER_URLS } from '@/data/constants';
import { m as motion } from 'framer-motion';
import Link from 'next/link';
import * as Io from 'react-icons/io5';
import { _footer as Container } from '../styles/modules/footer';

export function Footer() {
  const { state } = useAppContext();
  const { colorScheme, changeColorScheme } = useThemeContext();

  return (
    <Container>
      <section className='featured-container'>
        <h3>
          <Io.IoShieldCheckmarkOutline />
          <span>Sérios sobre segurança e privacidade</span>
        </h3>
        <h3>
          <Io.IoSpeedometerOutline />
          <span>Performance e estabilidade</span>
        </h3>
        <h3>
          <Io.IoHelpBuoyOutline />
          <span>24 horas de suporte integrado</span>
        </h3>
      </section>
      <section className='navigation'>
        <nav>
          <section>
            <h3>
              <Io.IoPaperPlaneOutline />
              <span>Navegação</span>
            </h3>
            <div className='elements'>
              {HEADER_URLS.map((item, index) => (
                <Link key={index.toString()} href={item.url}>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h3>
              <Io.IoDocumentsOutline />
              <span>Institucional</span>
            </h3>
            <div className='elements'>
              <Link href={'/legal/terms-of-use'}>
                <span>Termos de Uso</span>
              </Link>
              <Link href={'/legal/about'}>
                <span>Sobre nós</span>
              </Link>
              <Link href={'/legal/privacy'}>
                <span>Política de Privacidade</span>
              </Link>
              <Link href={'/legal/code-of-conduct'}>
                <span>Código de Conduta</span>
              </Link>
            </div>
          </section>
          <section>
            <h3>
              <Io.IoLockOpenOutline />
              <span>Acesso a Contas</span>
            </h3>
            <div className='elements'>
              {state.auth.id && (
                <Link href={`/dashboard`}>
                  <span>Minha conta</span>
                </Link>
              )}
              <Link href={'/auth/sign-in'}>
                <span>Acessar conta</span>
              </Link>
              <Link href={'/auth/sign-up'}>
                <span>Cadastrar-se</span>
              </Link>
              <Link href={'/auth/reset-password'}>
                <span>Recuperar conta</span>
              </Link>
            </div>
          </section>
          <section>
            <h3>
              <Io.IoExtensionPuzzleOutline />
              <span>Atendimento e Suporte</span>
            </h3>
            <div className='elements'>
              <Link href={'/contact'}>
                <span>Contacto</span>
              </Link>
              <Link href={'/docs/store-verification'}>
                <span>Verificação da Loja</span>
              </Link>
              <Link href={'/docs/faq'}>
                <span>Perguntas frequentes</span>
              </Link>
            </div>
          </section>
        </nav>
      </section>

      <div className='base-container'>
        <div className='base-container_presentation'>
          <div className='logo'>
            <p>
              &copy; {new Date().getFullYear()} {constants.defaultTitle} |{' '}
              {constants.companyName}
            </p>
          </div>
          <div className='sharer-button'>
            {constants.socialMedia.map((option) => (
              <motion.a
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
                href={option.url}
                title={option.name}
                target={'_blank'}
                rel={'noreferrer noopener'}
                key={option.name}>
                {<option.icon />}
              </motion.a>
            ))}
          </div>
        </div>

        <div className='theme-fluent-buttons'>
          <button
            title='Modo claro'
            className={
              colorScheme.scheme === 'light' && colorScheme.mode === 'manual'
                ? 'active'
                : ''
            }
            onClick={() => changeColorScheme({ mode: 'manual', scheme: 'light' })}>
            <Io.IoSunnyOutline />
          </button>
          <button
            title='Modo automático'
            className={colorScheme.mode === 'auto' ? 'active' : ''}
            onClick={() => changeColorScheme({ mode: 'auto', scheme: 'dark' })}>
            <Io.IoDesktopOutline />
          </button>
          <button
            title='Modo escuro '
            className={
              colorScheme.scheme === 'dark' && colorScheme.mode === 'manual' ? 'active' : ''
            }
            onClick={() => changeColorScheme({ mode: 'manual', scheme: 'dark' })}>
            <Io.IoMoonOutline />
          </button>
        </div>
      </div>
    </Container>
  );
}
