import {
  IoLockOpenOutline,
  IoNewspaperOutline,
  IoPaperPlaneOutline,
} from 'react-icons/io5';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BiMoon, BiSun } from 'react-icons/bi';
import { complements, urls } from '@/data/app-data';
import { useAppContext } from '@/context/AppContext';
import { useThemeContext } from '@/context/ThemeContext';
import { FooterContainer as Container } from '../styles/common/footer';

export default function Footer(): JSX.Element {
  const { darkmode, themeSwitcher } = useThemeContext();
  const { state } = useAppContext();
  return (
    <Container>
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
              <span>Legal e Contacto</span>
            </h3>
            <div className='elements'>
              <Link href={'/legal/privacy-policy'}>
                <span>Política de Privacidade</span>
              </Link>
              <Link href={'/legal/terms-and-conditions'}>
                <span>Termos e Condições</span>
              </Link>
              <Link href={'/contact'}>
                <span>Contacto</span>
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
                <Link
                  href={`/users/dashboard?user=${state.userAuth.id}&invalidated=${state.userAuth.invalidated}`}>
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
          title='Change Theme'
          aria-label='Toogle theme'
          className='theme-switcher'
          onClick={themeSwitcher}>
          {darkmode ? <BiSun /> : <BiMoon />}
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
