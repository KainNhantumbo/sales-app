import {
  IoDesktopOutline,
  IoExtensionPuzzleOutline,
  IoHelpBuoyOutline,
  IoLockOpenOutline,
  IoMoon,
  IoMoonOutline,
  IoNewspaperOutline,
  IoPaperPlaneOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoSunny,
  IoSunnyOutline
} from 'react-icons/io5';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { complements, urls } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { FooterContainer as Container } from '../styles/common/footer';

export default function Footer(): JSX.Element {
  const { setDarkMode, setLightMode, matchMediaTheme } = useThemeContext();
  const { state } = useAppContext();
  return (
    <Container>
      <section className='featured-container'>
        <h3>
          <IoShieldCheckmarkOutline />
          <span>Sérios sobre segurança e privacidade</span>
        </h3>
        <h3>
          <IoSpeedometerOutline />
          <span>Performance e estabilidade</span>
        </h3>
        <h3>
          <IoHelpBuoyOutline />
          <span>24 horas de suporte integrado</span>
        </h3>
      </section>
      <section className='navigation'>
        <nav>
          <section>
            <h3>
              <IoPaperPlaneOutline />
              <span>Navegação</span>
            </h3>
            <div className='elements'>
              {urls.map((item, index) => (
                <Link key={index.toString()} href={item.url}>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <h3>
              <IoNewspaperOutline />
              <span>Institucional</span>
            </h3>
            <div className='elements'>
              <Link href={'/legal/privacy-policy'}>
                <span>Política de Privacidade</span>
              </Link>
              <Link href={'/legal/terms-of-use'}>
                <span>Termos de Uso</span>
              </Link>
              <Link href={'/legal/about'}>
                <span>Sobre nós</span>
              </Link>
            </div>
          </section>
          <section>
            <h3>
              <IoLockOpenOutline />
              <span>Acesso a Contas</span>
            </h3>
            <div className='elements'>
              {state.auth.id && (
                <Link href={`/users/dashboard`}>
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
              <IoExtensionPuzzleOutline />
              <span>Atendimento e Suporte</span>
            </h3>
            <div className='elements'>
              <Link href={'/contact'}>
                <span>Contacto</span>
              </Link>
              <Link href={'/faq'}>
                <span>Perguntas frequêntes</span>
              </Link>
            </div>
          </section>
        </nav>
      </section>

      <div className='base-container'>
        <div className='base-container_presentation'>
          <div className='logo'>
            <p>
              &copy; {new Date().getFullYear()} {complements.defaultTitle} |
            {complements.companyName}
            </p>
          </div>
          <div className='sharer-button'>
            {complements.socialMedia.map((option) => (
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
          <button title='Modo claro' onClick={setLightMode}>
            <IoSunnyOutline />
          </button>
          <button title='Automático' onClick={matchMediaTheme}>
            <IoDesktopOutline />
          </button>
          <button title='Modo escuro ' onClick={setDarkMode}>
            <IoMoonOutline />
          </button>
        </div>
      </div>
    </Container>
  );
}
