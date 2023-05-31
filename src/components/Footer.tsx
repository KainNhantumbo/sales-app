import {
  IoExtensionPuzzleOutline,
  IoHelpBuoyOutline,
  IoLockOpenOutline,
  IoMoon,
  IoNewspaperOutline,
  IoPaperPlaneOutline,
  IoShieldCheckmarkOutline,
  IoSpeedometerOutline,
  IoSunny
} from 'react-icons/io5';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { complements, urls } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { FooterContainer as Container } from '../styles/common/footer';

export default function Footer(): JSX.Element {
  const { darkmode, themeSwitcher } = useThemeContext();
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
              {state.userAuth.id && (
                <Link href={`/users/dashboard/${state.userAuth.id}`}>
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

      <div className='social-container'>
        <div className='logo'>
          <span>{complements.defaultTitle}</span>
        </div>
        <div className='social-media'>
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
        <motion.button
          whileTap={{ scale: 0.7 }}
          transition={{ type: 'spring', duration: 0.5 }}
          title='Trocar o tema'
          aria-label='Trocar o tema'
          className='theme-switcher'
          onClick={themeSwitcher}>
          {darkmode ? <IoSunny /> : <IoMoon />}
        </motion.button>
      </div>
      <section>
        <div className='copyright'>
          <span>&copy; {complements.copyrightSentence}</span>
        </div>
      </section>
    </Container>
  );
}
